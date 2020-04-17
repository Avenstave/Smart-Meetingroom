import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoggedInGuard } from './loggdIn.guard';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowComponent } from './show/show.component';
import { AuthService } from './auth.service';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ConsolerComponent } from './consoler/consoler.component';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserListComponent } from './user-list/user-list.component';
import { FristPageComponent } from './frist-page/frist-page.component';
import { UserList2Component } from './user-list2/user-list2.component';
import { UserComponent } from './user/user.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { UserList3Component } from './user-list3/user-list3.component';
import { HumituerDataComponent } from './humituer-data/humituer-data.component';
import { EnvDataComponent } from './env-data/env-data.component';
import { Env2DataComponent } from './env2-data/env2-data.component';
import { Env3DataComponent } from './env3-data/env3-data.component';
import { MeetingroomComponent } from './meetingroom/meetingroom.component';
import { MsgDataComponent } from './msg-data/msg-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShowComponent,
    ConsolerComponent,
    ViewComponent,
    UpdateComponent,
    UserListComponent,
    FristPageComponent,
    UserList2Component,
    UserComponent,
    NotfoundpageComponent,
    UserList3Component,
    HumituerDataComponent,
    EnvDataComponent,
    Env2DataComponent,
    Env3DataComponent,
    MeetingroomComponent,
    MsgDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
