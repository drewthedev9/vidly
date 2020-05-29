// import * as Sentry from '@sentry/browser';

// centralized logging service to call throught out app.
function init(){
    //Sentry.init({dsn: "https://18ce10fcc7314151afc12205bf488500@o393586.ingest.sentry.io/5242903"});

}

function log(error){
    console.log(error);
    //Sentry.captureException();
}

export default {
    init,
    log
};