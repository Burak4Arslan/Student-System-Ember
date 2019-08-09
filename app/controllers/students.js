import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        getStudents: function() {
            let students;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    students = JSON.parse(xmlHttp.responseText)
                    // console.log(students)
                    for(let i=0;i<students.length;i++) {
                        console.log(students[i].name,students[i].surname);
                    }
                    this.set("students", students);
                }
            }
            xmlHttp.open("GET","http://localhost:8081/students", true);
            xmlHttp.send();
        },
        addStudent: () => {

            let name = document.getElementById('name').value;
            let surname = document.getElementById('surname').value;

            let student = {
                "name": name,
                "surname": surname
            }

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange =  () => { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200){

                }
            }
            xmlHttp.open("POST","http://localhost:8081/student", true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(student));
        }
    }

});
