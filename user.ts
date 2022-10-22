export class User{

constructor(email:string, password:string)
{
this._email = email;
this._password = password;
}

private _email:string;
public get email() {
    return this._email;
}
public set email(email:string){
    this._email = email;
}

private _password:string;
public get password(){
    return this._password;
}
public set password(password:string){
    this._password = password;
}
}