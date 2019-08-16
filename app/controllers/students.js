import Controller from '@ember/controller';
let self;
let currentStudent;
export default Controller.extend({
    actions: {
        getStudents: function() {
            this.toggleProperty('open-close');
            self = this;
            getAllStudents();
        },
        addStudent: function() {
            self = this;
            let name = document.getElementById('name').value;
            let surname = document.getElementById('surname').value;
            name = name.trim();
            surname = surname.trim();
            console.log
            if(!(name && surname)) {
                document.getElementById('name').value="";
                document.getElementById('surname').value="";
                return;
            }
            this.incrementProperty('open-close');

            let student = {
                "name": name,
                "surname": surname
            }

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange =  () => { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    getAllStudents();
                }
            }
            xmlHttp.open("POST","http://localhost:8081/student", true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(student));
            document.getElementById('name').value="";
            document.getElementById('surname').value="";
        },
        deleteStudent : function(student) {
            let deletingStudentID = student.id;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange =  () => { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    getAllStudents();
                }
            }
            xmlHttp.open("DELETE","http://localhost:8081/student/"+deletingStudentID, true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send();
        },
        openLessonList : function(student) {
            document.getElementById('lessonListDivID').style.display = 'block';
            currentStudent = student;
            self = this;
            getAllLessons();


        },
        addLessonToStudent : function(lesson) {
            self = this;
            let students;
            var xmlHttp = new XMLHttpRequest();
             xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    // let i;
                    // for(i=0;i<currentStudent.lessons.length;i++){
                    //     console.log(currentStudent.lessons[i]);
                    // }

                    var xmlHttp2 = new XMLHttpRequest();
                    xmlHttp2.onreadystatechange = () => { 
                        if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200){
                            students = JSON.parse(xmlHttp2.responseText)
                            self.set("students", students);
                            
                            let j;
                            for(j=0;j<students.length;j++){
                                if(students[j].id == currentStudent.id) {
                                    currentStudent = students[j];
                                    console.log(currentStudent);
                                    break;
                                }
                            }


                        }
                    }
                    xmlHttp2.open("GET","http://localhost:8081/students", true);
                    xmlHttp2.send();
                }
            }
            xmlHttp.open("PUT","http://localhost:8081/student/"+currentStudent.id+"/lesson/"+lesson.id, true);
            xmlHttp.send();
        }
    }
    
});

function getAllStudents() {

    let students;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            students = JSON.parse(xmlHttp.responseText)
            self.set("students", students);
            return students;
        }
    }
    xmlHttp.open("GET","http://localhost:8081/students", true);
    xmlHttp.send();
}

function getAllLessons() {

    let lessons;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            lessons = JSON.parse(xmlHttp.responseText);
            self.set("lessons", lessons);
        }
    }
    xmlHttp.open("GET","http://localhost:8081/lessons", true);
    xmlHttp.send();

}