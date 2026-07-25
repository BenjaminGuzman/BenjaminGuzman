import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Project} from "./project/Project";
import {SupabaseService} from "../supabase.service";
import {environment} from "../../environments/environment";
import {last, Subscription} from "rxjs";
import {ProjectComponent} from "./project/project.component";
import { trigger, style, animate, transition } from '@angular/animations';
import {NavService} from "../nav/nav.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren("projectComponent", {read: ElementRef})
  public projectComponents!: QueryList<ElementRef>;

  public shouldScrollToLastProject: boolean = false;
  public subscriptions: Subscription[] = [];
  public renderedProjects: Project[] = [];
  public projects: Project[] = [];
  public isLoading: boolean = true;

  private shouldShowProjects: boolean = false;

  constructor(private supabase: SupabaseService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    const s = this.projectComponents.changes.subscribe((updatedProjectComponents: QueryList<ElementRef>) => {
      if (this.shouldScrollToLastProject) {
        this.shouldScrollToLastProject = false;
        updatedProjectComponents.last.nativeElement.scrollIntoView({block: "center"});
      }
    });

    this.subscriptions.push(s);
  }

  async ngOnInit() {
    try {
      if (!environment.loadProjects)
        return;

            this.projects = [
        {
          name: 'bsort',
          imgUrls: ['/assets/img/bsort/branch_misses.webp', '/assets/img/bsort/cache.webp', '/assets/img/bsort/conclusion.webp', '/assets/img/bsort/cycles.webp', '/assets/img/bsort/floating-point-tracing.webp'],
          techStack: [{ name: 'C++', icon: '/assets/img/tech/c++.webp', iconType: 'img' as any }],
          links: [{ name: 'Paper', url: 'https://doi.org/10.48550/arXiv.2603.08929', icon: '/assets/img/tech/doi.svg', iconType: 'img' as any }, { name: 'GitHub', url: 'https://github.com/BenjaminGuzman/bsort', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Non-comparison-based sorting algorithm for integers and floating-point values with O(wn) run-time asymptotic behavior and O(w) auxiliary space',
          tags: ['Algorithms', 'Research', 'High performance', 'Profiling'],
          skills: 'C++, algorithms, academic research & writing, profiling',
          years: '2020 - 2026'
        },
        {
          name: 'lox',
          imgUrls: ['/assets/img/lox/lox.png'],
          techStack: [
            { name: 'C++', icon: '/assets/img/tech/c++.webp', iconType: 'img' as any },
            { name: 'LLVM', icon: '/assets/img/tech/llvm.svg', iconType: 'img' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Interpreter and compiler for the Lox programming language written in C++ and LLVM',
          tags: ['Compilers', 'Interpreters', 'Language theory'],
          skills: 'C++, language theory, compilers, interpreters',
          years: '2026'
        },
        {
          name: 'docker compose viz',
          imgUrls: ['/assets/img/docker compose viz/0.webp', '/assets/img/docker compose viz/1.webp'],
          techStack: [
            { name: 'Go', icon: 'devicon-go-plain colored', iconType: 'class' as any },
            { name: 'Docker', icon: 'devicon-docker-plain colored', iconType: 'class' as any },
            { name: 'Graphviz', icon: '/assets/img/tech/graphviz.webp', iconType: 'img' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/docker/compose/issues/10364', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Original author of docker compose viz subcommand useful to generate a visual representation of services\' dependency/interaction graph.',
          tags: ['Docker', 'Tooling', 'Open source'],
          skills: 'Go, Docker, Open source contribution',
          years: '2023'
        },
        {
          name: 'Login monitor',
          imgUrls: ['/assets/img/Login monitor/0.webp', '/assets/img/Login monitor/1.webp'],
          techStack: [
            { name: 'Go', icon: 'devicon-go-plain colored', iconType: 'class' as any },
            { name: 'GCP', icon: 'devicon-googlecloud-plain colored', iconType: 'class' as any },
            { name: 'AWS', icon: 'devicon-amazonwebservices-original colored', iconType: 'class' as any },
            { name: 'Linux', icon: 'devicon-linux-plain', iconType: 'class' as any },
          ],
          links: [
            { name: 'GitHub', url: 'https://github.com/BenjaminGuzman/login-monitor', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any },
            { name: 'Medium', url: 'https://blog.devgenius.io/monitoring-logins-to-a-server-4cbd1515a4b9', icon: '/assets/img/tech/medium.webp', iconType: 'img' as any }
          ],
          description: 'Tool to monitor logins to a linux computer and send email alerts.',
          tags: ['Security', 'Linux', 'Monitoring', 'Tooling'],
          skills: 'Go',
          years: '2022'
        },
        {
          name: 'Fsociety Ransomware',
          imgUrls: ['/assets/img/Fsociety Ransomware/0.webp'],
          techStack: [
            { name: 'C++', icon: '/assets/img/tech/c++.webp', iconType: 'img' as any },
            { name: 'Linux', icon: 'devicon-linux-plain', iconType: 'class' as any },
            { name: 'C', icon: 'devicon-c-plain colored', iconType: 'class' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/fsociety-ransomware', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'PoC (Proof of Concept) ransomware with various mechanisms to avoid being stopped. Inspired by Mr. Robot TV series.',
          tags: ['Cybersecurity', 'PoC'],
          skills: 'C, C++, Security',
          years: '2022'
        },
        {
          name: 'gentoo-utils',
          imgUrls: ['/assets/img/gentoo-utils/gentoo.png'],
          techStack: [
            { name: 'Bash', icon: 'devicon-bash-plain', iconType: 'class' as any },
            { name: 'Go', icon: 'devicon-go-plain colored', iconType: 'class' as any },
            { name: 'Gentoo', icon: '/assets/img/tech/gentoo.svg', iconType: 'img' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Set of bash and Go utilities to automate Gentoo Linux configuration and package management tasks.',
          tags: ['Linux', 'Automation', 'System administration'],
          skills: 'Bash, OS',
          years: '2023 - Present'
        },
        {
          name: 'SpineWare',
          imgUrls: ['/assets/img/SpineWare/0.webp', '/assets/img/SpineWare/1.webp', '/assets/img/SpineWare/2.webp', '/assets/img/SpineWare/3.webp'],
          techStack: [
            { name: 'Java', icon: 'devicon-java-plain colored', iconType: 'class' as any },
            { name: 'Linux', icon: 'devicon-linux-plain', iconType: 'class' as any },
            { name: 'OpenCV', icon: '/assets/img/tech/opencv.svg', iconType: 'img' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/SpineWare', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Desktop application to take care of your health while using the computer by monitoring your posture with computer vision (OpenCV) and reminding you to take breaks.',
          tags: ['Computer Vision', 'Desktop app'],
          skills: 'Java',
          years: '2020'
        },
        {
          name: 'Microstart',
          imgUrls: ['/assets/img/Microstart/0.webp', '/assets/img/Microstart/1.webp', '/assets/img/Microstart/2.webp'],
          techStack: [
            { name: 'Java', icon: 'devicon-java-plain colored', iconType: 'class' as any },
            { name: 'Python', icon: 'devicon-python-plain colored', iconType: 'class' as any },
            { name: 'Bash', icon: 'devicon-bash-plain', iconType: 'class' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/microstart', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'CLI utility to run processes in parallel with a start-up order. Useful when working with microservices with dependencies on each other.',
          tags: ['CLI', 'Microservices', 'Tooling', 'Concurrency'],
          skills: 'Java',
          years: '2023 - 2024'
        },
        {
          name: 'GQLFedUtils',
          imgUrls: ['/assets/img/GQLFedUtils/0.webp', '/assets/img/GQLFedUtils/1.webp', '/assets/img/GQLFedUtils/2.webp'],
          techStack: [{ name: 'Java', icon: 'devicon-java-plain colored', iconType: 'class' as any }],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/GQLFedUtils', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'GraphQL federation utilities to purge schemas via annotations and transpile the schema to graphviz dot code.',
          tags: ['GraphQL', 'Backend tooling'],
          skills: 'Java',
          years: '2023 - 2024'
        },
        {
          name: 'Foraminifera',
          imgUrls: ['/assets/img/Foraminifera/0.webp', '/assets/img/Foraminifera/1.webp', '/assets/img/Foraminifera/2.webp', '/assets/img/Foraminifera/3.webp', '/assets/img/Foraminifera/4.webp'],
          techStack: [
            { name: 'Python', icon: 'devicon-python-plain colored', iconType: 'class' as any },
            { name: 'Numpy', icon: 'devicon-numpy-original colored', iconType: 'class' as any },
            { name: 'OpenCV', icon: '/assets/img/tech/opencv.svg', iconType: 'img' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/foraminifera', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Foraminifera species identification using supervised machine learning (~50% accuracy).',
          tags: ['Machine learning', 'Computer vision', 'Classification'],
          skills: 'Python',
          years: '2019 - 2020'
        },
        {
          name: 'Programa Delfín 2018',
          imgUrls: ['/assets/img/Programa Delfín 2018/0.webp', '/assets/img/Programa Delfín 2018/1.webp', '/assets/img/Programa Delfín 2018/2.webp'],
          techStack: [
            { name: 'Python', icon: 'devicon-python-plain colored', iconType: 'class' as any },
            { name: 'Jupyter', icon: 'devicon-jupyter-plain colored', iconType: 'class' as any },
            { name: 'Numpy', icon: 'devicon-numpy-original colored', iconType: 'class' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/ProgramaDelfin', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Machine Learning, Data Mining and Computer Vision practices and exercises developed during my research internship at UPIITA-IPN.',
          tags: ['Research', 'Machine learning', 'Computer vision'],
          skills: '',
          years: '2018'
        },
        {
          name: 'Programa Delfín 2019',
          imgUrls: ['/assets/img/Programa Delfín 2019/0.webp', '/assets/img/Programa Delfín 2019/1.webp', '/assets/img/Programa Delfín 2019/2.webp'],
          techStack: [
            { name: 'Python', icon: 'devicon-python-plain colored', iconType: 'class' as any },
            { name: 'Numpy', icon: 'devicon-numpy-original colored', iconType: 'class' as any },
            { name: 'Scikit-Learn', icon: '/assets/img/tech/scikitlearn.svg', iconType: 'img' as any },
            { name: 'Tableau', icon: '/assets/img/tech/tableau.svg', iconType: 'img' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/ProgramaDelfin', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Developed a tool to gather information from social media and other sources about crime in Mexico City.',
          tags: ['Research', 'OSINT', 'Data gathering'],
          skills: '',
          years: '2019'
        },
        {
          name: 'Row reduction',
          imgUrls: ['/assets/img/Row reduction/0.webp'],
          techStack: [
            { name: 'Angular', icon: 'devicon-angularjs-plain colored', iconType: 'class' as any },
            { name: 'TypeScript', icon: 'devicon-typescript-plain colored', iconType: 'class' as any },
            { name: 'HTML5', icon: 'devicon-html5-plain colored', iconType: 'class' as any },
            { name: 'Tailwindcss', icon: 'devicon-tailwindcss-plain colored', iconType: 'class' as any }
          ],
          links: [
            { name: 'GitHub', url: 'https://github.com/BenjaminGuzman/row-reduction', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any },
            { name: 'Website', url: 'https://linalg.benjaminguzman.dev/', icon: 'devicon-chrome-plain', iconType: 'class' as any }
          ],
          description: 'Interactive web page to visualize and understand how the Gauss-Jordan elimination algorithm works step by step.',
          tags: ['Web', 'Linear algebra', 'Algorithms'],
          skills: '',
          years: '2021'
        },
        {
          name: 'supermock',
          imgUrls: ['/assets/img/supermock/0.webp', '/assets/img/supermock/1.webp', '/assets/img/supermock/2.webp', '/assets/img/supermock/3.webp', '/assets/img/supermock/4.webp'],
          techStack: [
            { name: 'Go', icon: 'devicon-go-plain colored', iconType: 'class' as any },
            { name: 'TypeScript', icon: 'devicon-typescript-plain colored', iconType: 'class' as any },
            { name: 'Angular', icon: 'devicon-angularjs-plain colored', iconType: 'class' as any },
            { name: 'Docker', icon: 'devicon-docker-plain colored', iconType: 'class' as any },
            { name: 'Python', icon: 'devicon-python-plain colored', iconType: 'class' as any },
            { name: 'Tailwindcss', icon: 'devicon-tailwindcss-plain colored', iconType: 'class' as any },
            { name: 'Nginx', icon: 'devicon-nginx-original colored', iconType: 'class' as any }
          ],
          links: [{ name: 'GitHub', url: 'https://github.com/BenjaminGuzman/supermock', icon: '/assets/img/tech/github-light.webp', iconType: 'img' as any }],
          description: 'Mock web application intended as a learning tool for QA testers (automation, performance, manual). Features a microservices backend and a Single Page Application frontend.',
          tags: ['Web', 'Testing', 'Microservices', 'SPA', 'Automation'],
          skills: '',
          years: '2022'
        }
      ];
      this.projects = this.projects.reverse(); // reverse the array because pop operation is less expensive as compared
      // to slice operation (which moves the elements on each call) (see loadMore method)

      this.loadMore(false); // push the first 3 projects
    } catch (e) {
      // network error should be handled by getProjects()
    } finally {
      this.isLoading = false;

      // this is to prevent the UI from blocking because it is rendering the matrix animation and the project list
      if (this.shouldShowProjects)
        this.changeDetectorRef.markForCheck();
    }
  }

  showProjects() {
    this.shouldShowProjects = true;
    if (!this.isLoading) {
      // this.changeDetectorRef.detectChanges();
      this.changeDetectorRef.markForCheck();
    }
  }

  loadMore(scroll: boolean = true) {
    let p: Project | undefined;

    for (let i = 0; i < 3 && (p = this.projects.pop()) !== undefined; i++)
      this.renderedProjects.push(p);

    this.changeDetectorRef.markForCheck();

    if (scroll) {
      this.shouldScrollToLastProject = true;

      // old code (now scrollIntoView is used whenever the ViewChildren changes)
      // window.scrollTo(window.scrollX, window.scrollY + document.documentElement.clientHeight / 2); // scroll down half the viewport
    }

    // "show more" button will be automatically hidden when projects array is empty (see template)
  }
}
