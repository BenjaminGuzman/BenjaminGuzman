import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

export interface ExperienceRole {
  title: string;
  company: string;
  date: string;
  points: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
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
export class ExperienceComponent implements OnInit {
  public renderedRoles: ExperienceRole[] = [];
  public roles: ExperienceRole[] = [
    {
      title: 'Software Development Engineer II (L5)',
      company: 'Audible, an Amazon company',
      date: 'May 2025 - Now',
      points: [
        'Designed and implemented automated integration, E2E and canary tests that allowed three service pipelines to be full CI/CD, requiring no manual intervention and reducing ~24 hours of on-call work per month.',
        'Accelerated development and troubleshooting for a legacy service by enabling local execution and remote debugging, thus reducing the dependency on shared staging servers.',
        'Analyzed the metadata database (TiB scale) to identify root causes for several issues, designed a strategy to apply remediations (partitioning, indexing, ...) with no downtime, while guiding an SDE I and an SDE II through the whole process.',
        'Interviewer for SDE I and SDE II roles'
      ]
    },
    {
      title: 'Software Development Engineer II (L5)',
      company: 'Lab126, an Amazon company',
      date: 'Feb 2024 - Apr 2025',
      points: [
        'Designed and implemented the engine for serializing the OS-level UI hierarchy into XML and resolving xpath queries, as well as the remote screen capture functionality on Vega OS. This enabled Appium Inspector integration, and it drove a ~3x increase in adoption of the VegaOS automation toolkit.',
        'Designed and implemented tool to sideload native Vega OS libraries. This allowed some features and bug fixes to be delivered to customers in matter of hours, instead of weeks compared to the monolithic OS build and deliver process.',
        'Designed and implemented an algorithm to determine visibility of an element in Vega OS UI. This in turn allowed all of our customers reach 100% of Business Acceptance Testing for a prototype product, which was an executive level goal.',
        'Configured cross-compilation toolchain for compiling, running and debugging a Vega OS library and executable in MacOS. Also integrated coverage tools, as well as local and remote debugging capabilities to the team codebase. Thus, removing the need to wait hours for OS (re)builds in an expensive (~80 USD/person) server.',
        'Mentored an SDE intern on a project to implement W3C actions on the Vega OS\'s WebDriver, which expanded testing for customers, and helped in the intern\'s successful conversion to full-time SDE I.'
      ]
    },
    {
      title: 'Support Engineer IV (L5)',
      company: 'Audible, an Amazon company',
      date: 'Jun 2023 - Jan 2024',
      points: [
        'Designed and implemented tests that eliminated the need for manual intervention on pipelines that promoted OS patches.',
        'Developed self-compiling, self-disposing agent to automate log analysis with no residual footprint, reducing task time from ~30 min to ~1 min per engineer.',
        'Developed a system to collect period-close-related tickets\' information for reporting purposes.',
        'Interviewer for Support Engineer IV and Support Engineer III roles'
      ]
    },
    {
      title: 'Software Development Engineer',
      company: 'Hexaware Technologies',
      date: 'Jan 2023 - Jul 2023',
      points: [
        'Maintenance, discovery, and fixing of bugs and vulnerabilities in internal application used to automate tests.',
        'Developed own scripting language to automate tasks in a desktop application, which eliminated the need for manual intervention in regression test suites by ~90%.',
        'In charge of the design and development of application using microservices'
      ]
    },
    {
      title: 'Software Development Engineer in Test',
      company: 'Hexaware Technologies',
      date: 'Aug 2022 - Jan 2023',
      points: [
        'Tested web applications using HP LoadRunner tools (VuGen, Controller, Analysis)',
        'Developed internal tools to migrate scripts from LoadRunner to NeoLoad, which reduced migration time from ~40 min to ~5 min, per script.',
        'Developed mock web application to improve training of new joiners or anyone willing to learn about testing.'
      ]
    },
    {
      title: 'Frontend Developer (Freelance)',
      company: 'Transportación Turística El Mariachi Viajero',
      date: 'Jan 2022 - Jun 2022',
      points: [
        'Developed webpage to show the trips and tours catalog offered to the general public',
        'Designed and created backend architecture using serverless services',
        'Improved SEO and implemented best practices for social media sharing'
      ]
    },
    {
      title: 'Software Development Engineer',
      company: 'Own startup in association with World Boxing Council (WBC)',
      date: 'Nov 2020 - Dec 2021',
      points: [
        'Designed and developed a web application to improve communication and manage personnel inside and outside WBC',
        'Developed backend with a microservices architecture',
        'Helped integrating backend and frontend, as well as creating some frontend components',
        'Managed deployment to production (RHEL server management and security, container creation and orchestration)',
        'Integrated this web application with a preexisting data collection system (see below)'
      ]
    },
    {
      title: 'Data Engineer',
      company: 'World Boxing Council (WBC)',
      date: 'Feb 2020 - Oct 2020',
      points: [
        'Designed and developed a distributed system to collect and store boxing data from various Internet sources',
        'Transformed and analyzed the collected data to report insights on a dashboard'
      ]
    },
    {
      title: 'Research intern (Programa Delfín)',
      company: 'ITESM',
      date: 'Jun 2019 - Nov 2019',
      points: [
        'Developed a tool to gather information from social media and other sources about crime in Mexico City',
        'Learned about DevOps, microservices, containerization and agile by working on a project to streamline management and allocation of parking spaces inside ITESM'
      ]
    },
    {
      title: 'Research intern (Programa Delfín)',
      company: 'UPIITA - IPN',
      date: 'Jun 2018 - Aug 2018',
      points: [
        'Attended workshops about Machine Learning, Data Mining, and Computer Vision'
      ]
    }
  ];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Reverse the array so we can pop items efficiently
    this.roles = this.roles.reverse();
    this.loadMore();
  }

  loadMore() {
    let role: ExperienceRole | undefined;

    for (let i = 0; i < 3 && (role = this.roles.pop()) !== undefined; i++) {
      this.renderedRoles.push(role);
    }

    this.changeDetectorRef.markForCheck();
  }
}
