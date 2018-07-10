import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { IModulePart } from '../modal/IModuleDetail';

@Component({
    selector: 'part-list',
    templateUrl: './partlist.component.html',
    styleUrls: ['./partlist.component.css']
})
export class PartlistComponent implements OnInit, OnChanges {

    @Input() partlist: IModulePart[] = [];
    // @Input() pmNameFilter: string = '';
    @Input() uniquePMList: string[] = ["Kit Change", "zzz", "asasa"];
    InputfilterList: string[] = [];
    filteredPartlist: IModulePart[] = [];
    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        let partListChanges = changes["partlist"];
        //let pmNameFilter = changes["pmNameFilter"];
        if (partListChanges) {
            this.partlist = partListChanges.currentValue;
            this.filteredPartlist = partListChanges.currentValue;
        }

        // if (pmNameFilter) {
        //     console.log(`filter val - ${pmNameFilter.currentValue}`);
        //     //this.partlist = Object.assign([],this.partlist.filter(x => x.PM_Name === pmNameFilter.currentValue));
        // }
    }

    removePart(e: IModulePart): void {
        this.partlist.splice(this.partlist.indexOf(e), 1);
        console.log(e);

    }

    filterParts(e: any, pm: string): void {
        if (e.target.checked) {
            this.InputfilterList.push(pm);
            console.log("it is checked");
        }
        else {
            console.log("it is NOT  checked");
            this.InputfilterList = this.InputfilterList.filter(x => x !== pm);
            this.InputfilterList.findIndex(x => x === pm)
        }
        // if (this.InputfilterList) {
        //     this.InputfilterList.forEach(x => {
        //         this.filteredPartlist = this.partlist.filter(y => y.PM_Name === x);
        //     }
        //     )

        // }
        if (this.InputfilterList && this.InputfilterList.length > 0) {
            console.log("InputfilterList");
            console.log(this.InputfilterList);
            this.filteredPartlist =this.partlist.filter(y => this.InputfilterList.filter(x => y.PM_Name === x).length > 0);
           // this.filteredPartlist = this.InputfilterList.filter(y => this.partlist.filter(x => y.PM_Name === x));
           console.log("filteredPartlist");
            console.log(this.filteredPartlist);
        }
        else{
            this.filteredPartlist = this.partlist;
        }
       // console.log(this.InputfilterList);
    }

    columnToDisplay: ["PM Name", "Part Num"]

    sampleProducts = [
        {
            "ProductID": 1,
            "ProductName": "Chai",
            "SupplierID": 1,
            "CategoryID": 1,
            "QuantityPerUnit": "10 boxes x 20 bags",
            "UnitPrice": 18,
            "UnitsInStock": 39,
            "UnitsOnOrder": 0,
            "ReorderLevel": 10,
            "Discontinued": false,
            "Category": {
                "CategoryID": 1,
                "CategoryName": "Beverages",
                "Description": "Soft drinks, coffees, teas, beers, and ales"
            },
            "FirstOrderedOn": new Date(1996, 8, 20)
        },
        {
            "ProductID": 2,
            "ProductName": "Chang",
            "SupplierID": 1,
            "CategoryID": 1,
            "QuantityPerUnit": "24 - 12 oz bottles",
            "UnitPrice": 19,
            "UnitsInStock": 17,
            "UnitsOnOrder": 40,
            "ReorderLevel": 25,
            "Discontinued": false,
            "Category": {
                "CategoryID": 1,
                "CategoryName": "Beverages",
                "Description": "Soft drinks, coffees, teas, beers, and ales"
            },
            "FirstOrderedOn": new Date(1996, 7, 12)
        },
        {
            "ProductID": 3,
            "ProductName": "Aniseed Syrup",
            "SupplierID": 1,
            "CategoryID": 2,
            "QuantityPerUnit": "12 - 550 ml bottles",
            "UnitPrice": 10,
            "UnitsInStock": 13,
            "UnitsOnOrder": 70,
            "ReorderLevel": 25,
            "Discontinued": false,
            "Category": {
                "CategoryID": 2,
                "CategoryName": "Condiments",
                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
            },
            "FirstOrderedOn": new Date(1996, 8, 26)
        },
        {
            "ProductID": 4,
            "ProductName": "Chef Anton's Cajun Seasoning",
            "SupplierID": 2,
            "CategoryID": 2,
            "QuantityPerUnit": "48 - 6 oz jars",
            "UnitPrice": 22,
            "UnitsInStock": 53,
            "UnitsOnOrder": 0,
            "ReorderLevel": 0,
            "Discontinued": false,
            "Category": {
                "CategoryID": 2,
                "CategoryName": "Condiments",
                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
            },
            "FirstOrderedOn": new Date(1996, 9, 19)
        },
        {
            "ProductID": 5,
            "ProductName": "Chef Anton's Gumbo Mix",
            "SupplierID": 2,
            "CategoryID": 2,
            "QuantityPerUnit": "36 boxes",
            "UnitPrice": 21.35,
            "UnitsInStock": 0,
            "UnitsOnOrder": 0,
            "ReorderLevel": 0,
            "Discontinued": true,
            "Category": {
                "CategoryID": 2,
                "CategoryName": "Condiments",
                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
            },
            "FirstOrderedOn": new Date(1996, 7, 17)
        },
        {
            "ProductID": 6,
            "ProductName": "Grandma's Boysenberry Spread",
            "SupplierID": 3,
            "CategoryID": 2,
            "QuantityPerUnit": "12 - 8 oz jars",
            "UnitPrice": 25,
            "UnitsInStock": 120,
            "UnitsOnOrder": 0,
            "ReorderLevel": 25,
            "Discontinued": false,
            "Category": {
                "CategoryID": 2,
                "CategoryName": "Condiments",
                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
            },
            "FirstOrderedOn": new Date(1996, 9, 19)
        },
        {
            "ProductID": 7,
            "ProductName": "Uncle Bob's Organic Dried Pears",
            "SupplierID": 3,
            "CategoryID": 7,
            "QuantityPerUnit": "12 - 1 lb pkgs.",
            "UnitPrice": 30,
            "UnitsInStock": 15,
            "UnitsOnOrder": 0,
            "ReorderLevel": 10,
            "Discontinued": false,
            "Category": {
                "CategoryID": 7,
                "CategoryName": "Produce",
                "Description": "Dried fruit and bean curd"
            },
            "FirstOrderedOn": new Date(1996, 7, 22)
        },
        {
            "ProductID": 8,
            "ProductName": "Northwoods Cranberry Sauce",
            "SupplierID": 3,
            "CategoryID": 2,
            "QuantityPerUnit": "12 - 12 oz jars",
            "UnitPrice": 40,
            "UnitsInStock": 6,
            "UnitsOnOrder": 0,
            "ReorderLevel": 0,
            "Discontinued": false,
            "Category": {
                "CategoryID": 2,
                "CategoryName": "Condiments",
                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
            },
            "FirstOrderedOn": new Date(1996, 11, 1)
        },
        {
            "ProductID": 9,
            "ProductName": "Mishi Kobe Niku",
            "SupplierID": 4,
            "CategoryID": 6,
            "QuantityPerUnit": "18 - 500 g pkgs.",
            "UnitPrice": 97,
            "UnitsInStock": 29,
            "UnitsOnOrder": 0,
            "ReorderLevel": 0,
            "Discontinued": true,
            "Category": {
                "CategoryID": 6,
                "CategoryName": "Meat/Poultry",
                "Description": "Prepared meats"
            },
            "FirstOrderedOn": new Date(1997, 1, 21)
        },
        {
            "ProductID": 10,
            "ProductName": "Ikura",
            "SupplierID": 4,
            "CategoryID": 8,
            "QuantityPerUnit": "12 - 200 ml jars",
            "UnitPrice": 31,
            "UnitsInStock": 31,
            "UnitsOnOrder": 0,
            "ReorderLevel": 0,
            "Discontinued": false,
            "Category": {
                "CategoryID": 8,
                "CategoryName": "Seafood",
                "Description": "Seaweed and fish"
            },
            "FirstOrderedOn": new Date(1996, 8, 5)
        }
    ];

}
