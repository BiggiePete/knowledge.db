export interface SearchResult{
  title:string;
  summary:string;
  steps:number;
  id:number;
}

export interface GuideStep {
  text:string;
  order:number;
  optional:boolean;
}