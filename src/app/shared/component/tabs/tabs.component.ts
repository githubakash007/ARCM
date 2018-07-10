import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    @ViewChild('dynamicVariantTab', { read: ViewContainerRef }) dynamicVariantTabPlaceHolder;
    dynamicTabs: TabComponent[] = [];
    temp: TabComponent;

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab) => tab.active);

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(undefined,this.tabs.first);
        }
    }

    selectTab(e:any,tab: TabComponent) {

        if(e !== undefined){
            e.preventDefault();
        }
        // deactivate all tabs
        this.tabs.toArray().forEach(tab => tab.active = false);

        this.dynamicTabs.forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        if (tab) {
            tab.active = true;
        }
    }

    getActiveTab(): TabComponent {
        let activeTab = this.tabs.find(x => x.active === true);
        if (!activeTab) {
            activeTab = this.dynamicTabs.find(x => x.active);
        }
        return activeTab;
    }

    openNewTab(tabTitle: string, template, data, isCloseable = false): void {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);
        let viewContainerRef = this.dynamicVariantTabPlaceHolder;

        let componentRef = viewContainerRef.createComponent(componentFactory);
        let instance: TabComponent = componentRef.instance as TabComponent;

        instance.tabTitle = tabTitle;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;

        this.dynamicTabs.push(componentRef.instance as TabComponent);
        //AA- this.tabs.reset([...this.tabs.toArray(), componentRef.instance as TabComponent])

        // make it active
        this.selectTab(undefined,this.dynamicTabs[this.dynamicTabs.length - 1]);

        //AA- this.selectTab(instance);
    }

    makeDynamicStatic(d2s: TabComponent): void {
        let dynamicTabSaved: boolean = false;
        for (let i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === d2s) {
                dynamicTabSaved = true;
                // remove the tab from our array
                this.dynamicTabs.splice(i, 1);
                break;
            }
        }

        if (dynamicTabSaved) {
            this.tabs.reset([...this.tabs.toArray(), d2s]);
        }
        
        this.selectTab(undefined,d2s);

       // let temp: TabComponent = this.getActiveTab();
       // temp.dataContext

    }

    closeTab(tab: TabComponent) {
        for (let i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                // remove the tab from our array
                this.dynamicTabs.splice(i, 1);

                // destroy our dynamically created component again
                let viewContainerRef = this.dynamicVariantTabPlaceHolder;
                // let viewContainerRef = this.dynamicTabPlaceholder;
                viewContainerRef.remove(i);

                // set tab index to 1st one
                this.selectTab(undefined,this.tabs.first);
                break;
            }
        }
    }

    closeActiveTab() {
        let activeTabs = this.dynamicTabs.filter((tab) => tab.active);
        if (activeTabs.length > 0) {
            // close the 1st active tab (should only be one at a time)
            this.closeTab(activeTabs[0]);
        }
    }

}
