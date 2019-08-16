import Controller from '@ember/controller';
let self;

export default Controller.extend({
    actions: {
        getLessons: function() {
            this.toggleProperty('open-close');
            self = this;
            getAllLessons();
        },
        addLesson: function() {
            self = this;
            let name = document.getElementById('name').value;
            name = name.trim();
            console.log
            if(!(name)) {
                document.getElementById('name').value="";
                return;
            }
            this.incrementProperty('open-close');

            let lesson = {
                "name": name
            }

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange =  () => { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    getAllLessons();
                }
            }
            xmlHttp.open("POST","http://localhost:8081/lesson", true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(lesson));
            document.getElementById('name').value="";
        },
        deleteLesson : function(lesson) {
            console.log(lesson);
            let deletingLessonID = lesson.id;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange =  () => { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    getAllLessons();
                }
            }
            xmlHttp.open("DELETE","http://localhost:8081/lesson/"+deletingLessonID, true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send();
        }
    }
    
});

function getAllLessons() {

    let lessons;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            lessons = JSON.parse(xmlHttp.responseText)
            self.set("lessons", lessons);
        }
    }
    xmlHttp.open("GET","http://localhost:8081/lessons", true);
    xmlHttp.send();
}