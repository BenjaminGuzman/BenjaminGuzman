import { Component, OnInit } from '@angular/core';
import { Paper } from './paper/Paper';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  papers: Paper[] = [
    {
      title: 'bsort: A theoretically efficient non-comparison-based sorting algorithm for integer and floating-point numbers',
      imgUrls: [
        '/assets/img/bsort/cache.webp',
        '/assets/img/bsort/cycles.webp',
        '/assets/img/bsort/branch_misses.webp',
        '/assets/img/bsort/floating-point-tracing.webp',
        '/assets/img/bsort/conclusion.webp',
      ],
      journal: 'arXiv',
      date: 'March 2026',
      description: 'bsort is a non-comparison-based, linear-time, in-place (with respect to n) sorting algorithm capable of sorting signed/unsigned integers and floating-point values.',
      links: [
        {
          name: 'DOI',
          url: 'https://doi.org/10.48550/arXiv.2603.08929',
          iconType: 'img',
          icon: '/assets/img/tech/doi.svg'
        },
        {
          name: 'GitHub',
          url: 'https://github.com/BenjaminGuzman/bsort',
          iconType: 'img',
          icon: '/assets/img/tech/github-light.webp'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
