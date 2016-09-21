import { User } from './user';
import { Image } from './image';
import { Tag } from './tag';
import { Activity } from './activity';
import * as Collections from 'typescript-collections';

export class Vacation {
    constructor(
    public id: String,
    public owner: User,
    public members: Collections.LinkedList<User>,
    public title: String,
    public description: String ,
    public beginDate: Date,
    public endDate: Date,
    public tags: Collections.LinkedList<Tag>,
    public estimatedCost: number,
    public minMembers: number,
    public status: VacationStatus,
    public plannedActivities: Collections.LinkedList<Activity>,
    public comments: Collections.LinkedList<Comment>,
    public gallery: Collections.LinkedList<Image>
    ) {
        
    }
}