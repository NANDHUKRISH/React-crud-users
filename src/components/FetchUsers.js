import axios from 'axios';

export class FetchUsers {
    static serverURL="http://localhost:3005";
   
    static getAllGroup(){
        let groupURL=`${this.serverURL}/groups`;
        return axios.get(groupURL);
    }

    static getGroup(contact){
        let groupURL=`${this.serverURL}/groups/${contact.groupId}`;
        return axios.get(groupURL);
    }


    static getAllUsers() {
        let dataUrl=`${this.serverURL}/users`;
        return axios.get(dataUrl);
    }

    static getUser(userId) {
        let dataUrl=`${this.serverURL}/users/${userId}`;
        return axios.get(dataUrl);
    }

    static CreateUser(user) {
        let dataUrl=`${this.serverURL}/users`;
        return axios.post(dataUrl,user);
    }

    static UpdateUser(user,userId) {
        let dataUrl=`${this.serverURL}/users/${userId}`;
        return axios.put(dataUrl,user);
    }

    static DeleteUser(userId) {
        let dataUrl=`${this.serverURL}/users/${userId}`;
        return axios.delete(dataUrl);
    }


}
