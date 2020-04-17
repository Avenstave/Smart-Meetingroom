import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ConsolerComponent } from './consoler/consoler.component';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserList2Component } from './user-list2/user-list2.component';
import { UserList3Component } from './user-list3/user-list3.component';
import { UserComponent } from './user/user.component';
import { FristPageComponent } from './frist-page/frist-page.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { HumituerDataComponent } from './humituer-data/humituer-data.component';
import { EnvDataComponent } from './env-data/env-data.component';
import { Env2DataComponent } from './env2-data/env2-data.component';
import { Env3DataComponent } from './env3-data/env3-data.component';
import { LoggedInGuard } from './loggdIn.guard';
import { AuthService } from './auth.service';
import { MeetingroomComponent } from './meetingroom/meetingroom.component';
import { MsgDataComponent } from './msg-data/msg-data.component';

const appChildRoutes: Routes = [
  { path: "consoler", component: ConsolerComponent },
  { path: "view", component: ViewComponent },
  { path: "update", component: UpdateComponent },
  { path: '', redirectTo: 'consoler', pathMatch: 'full' },
  { path: '**', component: NotfoundpageComponent },
];
const appchildRoutes: Routes = [
  { path: "user-list", component: UserListComponent },
  { path: "user-list2", component: UserList2Component },
  { path: "user-list3", component: UserList3Component },
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: '**', component: NotfoundpageComponent },
];
const childRoutes: Routes = [
  { path: 'show', component: ShowComponent },
  { path: 'user', component: UserComponent, children: appchildRoutes, },
  { path: 'home', component: HomeComponent, children: appChildRoutes, },
  { path: 'frist-page', component: FristPageComponent },
  { path: '', redirectTo: 'show', pathMatch: 'full' },
  { path: '**', component: NotfoundpageComponent },
];

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'meet', component: MeetingroomComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, children: appchildRoutes, canActivate: [LoggedInGuard] },
  { path: 'home', component: HomeComponent, children: appChildRoutes, canActivate: [LoggedInGuard] },
  { path: 'frist-page', component: FristPageComponent, canActivate: [LoggedInGuard] },
  { path: 'humituer', component: HumituerDataComponent, canActivate: [LoggedInGuard] },
  { path: 'env', component: EnvDataComponent, canActivate: [LoggedInGuard] },
  { path: 'env2', component: Env2DataComponent, canActivate: [LoggedInGuard] },
  { path: 'env3', component: Env3DataComponent, canActivate: [LoggedInGuard] },
  { path: 'msg', component: MsgDataComponent, canActivate: [LoggedInGuard] },
  { path: 'show', component: ShowComponent },
  { path: '', redirectTo: 'show', pathMatch: 'full' },
  { path: '**', component: NotfoundpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
