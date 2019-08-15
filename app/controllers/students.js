import Controller from '@ember/controller';
let self;

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
        }
    }
    xmlHttp.open("GET","http://localhost:8081/students", true);
    xmlHttp.send();
}