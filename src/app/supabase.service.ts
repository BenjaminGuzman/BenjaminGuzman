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

    let projects: ProjectDB[] | null = this.loadProjectsFromCache();

    if (!projects) { // if there was no cache, load data from database
      let {data, error} = await this.supabase
        .from<ProjectDB>("Project")
        .select(`
          id,
          name,
          description,
          n_imgs,
          priority,
          skills,
          years,
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

      projects = data;
      this.saveProjectsToCache(projects);
    }

    this.projects = projects.map(p => ({
      name: p.name,
      description: p.description,
      skills: p.skills,
      years: p.years,
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

  /**
   * Returns true if the following conditions are true for the cache:
   *
   * - It is present (a call to {@link saveProjectsToCache} has been made previously)
   * - It hasn't expired
   *
   * Note that this doesn't load or check the storage key "Projects" is actually present and valid.
   * To do so you need to call {@link loadProjectsFromCache}
   */
  public isCacheHealthy(): boolean {
    const writtenAtStr = sessionStorage.getItem("ProjectsWrittenAt"); // date the cache was written
    if (!writtenAtStr) // there is no cache
      return false;

    const writtenAt = new Date(writtenAtStr);
    if (isNaN(writtenAt.getTime())) // cache may be corrupted
      return false;

    const elapsedDays = (new Date().getTime() - writtenAt.getTime()) / 1_000 /* ms -> s */ / 60 /* s -> m */ / 60/* m -> h */ / 24/* h -> d */;
    return elapsedDays <= 7;
  }

  public loadProjectsFromCache(): ProjectDB[] | null {
    if (!this.isCacheHealthy())
      return null;

    const projectsStr = sessionStorage.getItem("Projects");
    if (!projectsStr)
      return null;

    try {
      return JSON.parse(projectsStr);
    } catch (e) {
      console.error("Error while parsing data from cache", e, "Cache:", projectsStr);
      return null;
    }
  }

  public saveProjectsToCache(projects: ProjectDB[]) {
    // because the user is likely to visit the webpage just once (or very few times)
    // it is better to save the cache in sessionStorage (erased when the tab is closed) rather than in localStorage (erased upon user request)
    sessionStorage.setItem("ProjectsWrittenAt", new Date().toISOString());
    sessionStorage.setItem("Projects", JSON.stringify(projects));
  }
}

interface ProjectDB {
  id: string;
  name: string;
  description: string;
  n_imgs: number;
  priority: number;
  skills: string;
  years: string;
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
