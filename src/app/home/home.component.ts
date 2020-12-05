import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    apiUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json";
    userData: any = "";
    groupname: any = "";
    description: any = "";
    imageSrc: string = '';
    isChecked: boolean = false;
    error = "";
    isShow = false;

    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.fetchData();
    } 
    // open & close popup
    openPopup() {
        this.isShow = true;
        this.groupname = "";
        this.description = "";
        this.error = "";
        this.userData.forEach(u => {
            u.isChecked = false;
        });   
        document.body.style.overflowY = "hidden"; 
    }

    closePopup() {
        this.isShow = false;
        document.body.style.overflowY = "auto";
    }

    // fetch userdata  
    async fetchData(){
        const data = await this.httpClient.get(this.apiUrl).toPromise();
        this.userData = data;
        
    }
    // sort dropdown
    dropDownData = [
        {
            name: "Acending",
            value: "acending"
        },
        {
            name: "Decending",
            value: "decending"
        }
    ]
    // sort
    onOptionsSelected(value:string){
        if(value == "acending"){
            this.userData.sort((a, b) => a.name.localeCompare(b.name));
        }
        if(value == "decending"){
            this.userData.sort((a, b) => b.name.localeCompare(a.name));
        }
    }

    createGroup(){
        if(this.groupname == ""){
            this.error = "Please enter valid group name";
            return;
        }
        if(this.description == ""){
            this.error = "Description is mandatory";
            return;
        }

        this.error = "";
        this.isShow = false;
        alert("Group created successfully!");
        document.body.style.overflowY = "auto";

    }
    // checked users list
    get values() {
        return this.userData.filter(x => x.isChecked).map(x => x.id);
    }


    handleInputChange(e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
    }

}
