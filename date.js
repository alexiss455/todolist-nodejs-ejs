   
   module.exports.dayy = function dayy(){
         const date = Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric' }).format();
             return date;
    }
    module.exports.week = function week(){
        const today = new Date();
        const days = today.getDay();
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const weeks = weekday[days];
        return weeks;

    }
