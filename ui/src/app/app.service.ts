import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

export interface KeyTestPayload{
  loginType: string,
  AppId?: string,
  Key: string,
}

export interface AppDetails{
  id: string,
  name: string,
  description: string,
  token_expiry: number,
  token_notbefore: number,
  refresh_expiry: number,
  refresh_notbefore: number,
  key_type: string,
  algo: string,
  rotation_period: number,
  add_time: number,
  update_time: number,
  last_key_rotate: number
}
export interface AppCreate{
  name: string,
  description: string,
  token_expire: number,
  token_notbefore: number,
  refresh_expire: number,
  refresh_notbefore: number,
  key_type: string,
  algo: string,
  rotation_period: number,
}

export interface AppUpdate{
  name:string,
  description:string,
  token_expire:number,
  token_notbefore:number,
  refresh_expire:number,
  refresh_notbefore:number,
  rotation_period:number
}
export interface AppCreateResponse{
  algo:string,
  app_id:string,
  app_key:string,
  public_key:string
}
export interface DeleteApp{
  app_id:string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  testKey(payload: KeyTestPayload){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', payload.Key)
    headers = headers.append('X-Skip-Auth', "true")

    if (payload.loginType == 'root'){
      return this.http.get<AppDetails>(
        environment.APIENDPOINT + "/root/list",
        {headers}
      );
    }

    return this.http.get<AppDetails>(
      environment.APIENDPOINT + "/app/" + payload.AppId,
      {headers}
    );
  }

  getAllProjects(){
    return this.http.get<AppDetails>(
			environment.APIENDPOINT + "/root/list"
		);
  }
  
  createApp(formData: AppCreate) {
    return this.http.post<AppCreateResponse>(
      environment.APIENDPOINT + "/root/create", 
      formData,
    );
  }
  
  deleteProject(appId: string){
    return this.http.delete<DeleteApp>(
      environment.APIENDPOINT + '/root/' + appId
    );
  }

  flushProject(appId:string){
    return this.http.delete<DeleteApp>(
    environment.APIENDPOINT + `/root/${appId}/flush`
    )
  }
  rotateAppKey(appId:string){
    return this.http.get<DeleteApp>(
    environment.APIENDPOINT + `/root/${appId}/rotate/key`
    )
  }
  rotateAppPki(appId:string){
    return this.http.get<DeleteApp>(
    environment.APIENDPOINT + `/root/${appId}/rotate/pki`
    )
  }
  updateApp(appId:string ,formData:AppUpdate){
    return this.http.patch<AppDetails>(
    environment.APIENDPOINT + `/root/${appId}`,
    formData
    )
  }
}  
