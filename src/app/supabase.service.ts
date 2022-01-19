import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';
import {AppComponent} from './app.component';
import {IconType} from "./portfolio/project/Technology";
import {Project} from "./portfolio/project/Project";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private projects: Project[] = [];

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  /**
   * Get the map of technologies catalogs
   *
   * Technologies are mapped by their indexes
   *
   * This returns a promise because if the map hasn't been loaded yet, it'll load it (make a request to the server),
   * and in case it was already loaded, it simply returns it
   *
   * If there is an error, this method will automatically call {@link AppComponent#handleNetworkError}, so you don't
   * need to call it. Nevertheless, the promise is still rejected
   */
  public async getProjects(): Promise<Project[]> {
    if (this.projects.length > 0)
      return this.projects;

    const {data, error} = await this.supabase
      .from<ProjectDB>("Project")
      .select(`
        id,
        name,
        description,
        n_imgs,
        priority,
        skills,
        ProjectStack(
          Technology(name, acronym, url, icon, icon_type)
        ),
        ProjectLink(name, url, icon, icon_type),
        ProjectTag(tag)
      `)
      .gte("priority", 0)
      .order("priority", {ascending: false});

    if (error || data === null) {
      // @ts-ignore
      AppComponent.handleNetworkError(error);
      throw error;
    }

    this.projects = data.map(p => ({
      name: p.name,
      description: p.description,
      skills: p.skills,
      imgUrls: [...Array(p.n_imgs).keys()].map(imgIdx => `/assets/img/${p.name}/${imgIdx}.webp`),
      techStack: p.ProjectStack.map(s => ({
        iconType: s.Technology.icon_type,
        icon: s.Technology.icon,
        url: s.Technology.url,
        name: s.Technology.name,
        acronym: s.Technology.acronym
      })),
      links: p.ProjectLink.map(l => ({
        iconType: l.icon_type,
        icon: l.icon,
        url: l.url,
        name: l.name
      })),
      tags: p.ProjectTag.map(t => t.tag)
    }));
    // console.log(this.projects, data[0].ProjectStack);
    // console.log(this.projects[0].links, data[0].ProjectLink);
    return this.projects;
  }
}

interface ProjectDB {
  id: string;
  name: string;
  description: string;
  n_imgs: number;
  priority: number;
  skills: string;
  ProjectStack: {
    Technology: {
      name: string;
      acronym: string;
      url: string;
      icon: string;
      icon_type: IconType
    }
  }[];
  ProjectLink: {
    name: string;
    url: string;
    icon: string;
    icon_type: IconType;
  }[];
  ProjectTag: {
    tag: string;
  }[];
}
