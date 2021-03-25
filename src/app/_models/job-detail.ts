import { JobDependency } from "./job-dependency";

export class JobDetail {
    jobType: string;
    jobDependencies: JobDependency[];
}