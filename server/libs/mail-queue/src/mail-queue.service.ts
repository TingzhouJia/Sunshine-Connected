import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { User, Workshop, Course } from '@libs/db/model';

@Injectable()
export class MailQueueService {
    constructor(@InjectQueue('mail') private mailQueue: Queue) { }

    async addDeleteVideo(sender: Partial<User>, info: Partial<Workshop | Course>) {
        return await this.mailQueue.add('delete_video', { sender, info })
    }

    async addChangeVideo(id: string) {
        return await this.mailQueue.add('update_video', { id: id })
    }

    async addChangeAudit(id: string) {
        return await this.mailQueue.add('end_audit', { id })
    }
    async addStartAudit(id: string) {
        return await this.mailQueue.add('start_audit', { id })
    }

}
