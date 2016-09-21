import { User } from './user';
import { Image } from './image';
import { Tag } from './tag';
import { Activity } from './activity';

export class Vacation {
    constructor(
    public id: String,
    public owner: User,
    public members: User[],
    public title: String,
    public description: String ,
    public beginDate: Date,
    public endDate: Date,
    public tags: Tag[],
    public estimatedCost: number,
    public minMembers: number,
    public status: VacationStatus,
    public plannedActivities: Activity[],
    public comments: Comment[],
    public gallery: Image[],
    public titleImg: string //change to Image 
    ) {
        
    }
}