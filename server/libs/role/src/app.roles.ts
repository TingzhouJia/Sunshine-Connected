import { RolesBuilder } from 'nest-access-control'
export enum AppRoles {

    VOLUNTEER = "volunteer",
    COORDINATOR = "coordinator",
    SENIOR = 'senior',
    ADMIN = 'admin'


}
export enum AppResource {
    VIDEO = 'video',
    QUESTION = 'question',
    ANSWER = 'answer',
    USER = 'user',
    AUDIT = 'audit',
    ACTIONS = 'actions',
    WORKSHOP = 'workshop'
}
export const roles: RolesBuilder = new RolesBuilder();

const ADMIN_RESOURCE = [AppResource.ACTIONS, AppResource.ANSWER, AppResource.AUDIT, AppResource.QUESTION, AppResource.USER, AppResource.WORKSHOP]
const COORDINATOR_RESOURCE = [AppResource.ACTIONS, AppResource.ANSWER, AppResource.AUDIT, AppResource.VIDEO, AppResource.USER]
const VOLUNTEER_RESOURCE = [AppResource.ACTIONS,AppResource.ANSWER,AppResource.VIDEO]
const SENIOR_RESOURCE = [AppResource.ACTIONS, AppResource.QUESTION,]
roles.grant(AppRoles.ADMIN).createAny(ADMIN_RESOURCE, ['!user.password']).deleteAny(ADMIN_RESOURCE).updateAny(ADMIN_RESOURCE)
    .readAny(ADMIN_RESOURCE)

roles.grant(AppRoles.COORDINATOR).createOwn([AppResource.ACTIONS, AppResource.ANSWER, AppResource.VIDEO])
    .deleteOwn(COORDINATOR_RESOURCE).updateOwn(COORDINATOR_RESOURCE).readAny([AppResource.VIDEO, AppResource.AUDIT, AppResource.QUESTION, AppResource.WORKSHOP,])

roles.grant(AppRoles.SENIOR).createOwn(SENIOR_RESOURCE).updateOwn(SENIOR_RESOURCE).deleteOwn(SENIOR_RESOURCE).readAny([AppResource.ANSWER, AppResource.WORKSHOP, AppResource.QUESTION,])
    .readOwn([AppResource.USER, AppResource.ACTIONS])

roles.grant(AppRoles.VOLUNTEER).createOwn(VOLUNTEER_RESOURCE).updateOwn(VOLUNTEER_RESOURCE).deleteOwn(VOLUNTEER_RESOURCE).readAny([AppResource.QUESTION,AppResource.VIDEO,AppResource.WORKSHOP,AppResource.ANSWER])