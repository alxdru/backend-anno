Array.prototype.isNull = function (){
    return this.join().replace(/,/g,'').length === 0;
};

Array.prototype.filterNulls = function (){
    return this.filter((el) => el != null);
};

String.prototype.removeIllegalChars = function (){
    return this.replace(/[/\\?%*:|"<>]/g, '-');
}