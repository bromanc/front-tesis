import {Component, Input} from "@angular/core";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
    @Input() isExpanded: boolean = true;
    /*@Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

    handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);*/
}
