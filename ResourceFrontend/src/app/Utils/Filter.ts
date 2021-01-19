export class Filter{
    sortCoulumn : any = 'name';
    sortOrder : any = -1;
    searchText : any = '';
    skipRecord : any = 0;

    FiltertoString(){
        return '?sortColumn='+this.sortCoulumn+'&sortOrder='+this.sortOrder+'&searchText='+this.searchText+'&skip='+this.skipRecord;
    }
}