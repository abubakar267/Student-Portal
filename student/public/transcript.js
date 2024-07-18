document.addEventListener('DOMContentLoaded', async function() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`/api/transcript`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching course');
        }

        const { courses, marks } = await response.json();

        console.log('courses', courses);
        console.log('marks', marks);

        let marksSum = 0;
        let crdtSum = 0;
        let sumMultiplied = 0;
        let available = true;
        let combinedInfo = [];
        
        function getGradeAndPoints(marks) {
            if (marks >= 86) return { grade: 'A+', points: 4.00 };
            if (marks >= 82) return { grade: 'A', points: 3.67 };
            if (marks >= 78) return { grade: 'A-', points: 3.33 };
            if (marks >= 74) return { grade: 'B+', points: 3.00 };
            if (marks >= 70) return { grade: 'B', points: 2.67 };
            if (marks >= 66) return { grade: 'B-', points: 2.33 };
            if (marks >= 62) return { grade: 'C+', points: 2.00 };
            if (marks >= 58) return { grade: 'C', points: 1.67 };
            if (marks >= 54) return { grade: 'C-', points: 1.33 };
            return { grade: 'F', points: 0.00 };
        }
        
        marks.forEach((element) => {
            let obtMarks = Number(element.obtainedMarks);
            if (isNaN(obtMarks)) {
                available = false;
            } else {
                marksSum += obtMarks;
                let course = courses.find(course => course.courseCode === element.courseCode);
                if (course) {
                    let { grade, points } = getGradeAndPoints(obtMarks);
                    combinedInfo.push({
                        courseCode: element.courseCode,
                        obtainedMarks: obtMarks,
                        totalMarks: 100,
                        creditHours: Number(course.creditHours),
                        grade: grade,
                        points: points
                    });
                }
            }
        });

        if (!available) {
            console.log("Transcript Not available yet");
            console.log("Transcript Not available yet");
            const notAvailableMessage = document.createElement('div');
            notAvailableMessage.setAttribute("id",'transcript-unavailable');
            notAvailableMessage.textContent = 'Transcript Not Available Yet';
            document.getElementById('data').appendChild(notAvailableMessage);
            

        } else {
            combinedInfo.forEach((courseInfo) => {
                crdtSum += courseInfo.creditHours;
                sumMultiplied += courseInfo.points * courseInfo.creditHours;
            });

            let gpa = sumMultiplied / crdtSum;

            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Obtained Marks</th>
                        <th>Total Marks</th>
                        <th>Grade</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    ${combinedInfo.map(course => `
                        <tr>
                            <td>${course.courseCode}</td>
                            <td>${course.obtainedMarks}</td>
                            <td>${course.totalMarks}</td>
                            <td>${course.grade}</td>
                            <td>${course.points}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">Total Credit Hours</td>
                        <td>${crdtSum}</td>
                    </tr>
                    <tr>
                        <td colspan="4">Semester GPA</td>
                        <td>${gpa.toFixed(2)}</td>
                    </tr>
                </tfoot>
            `;




            const print_btn = document.createElement('button')
            print_btn.setAttribute("id","Download")
            print_btn.innerText = "Download"
            document.getElementById('data').appendChild(table);
            document.getElementById('print').appendChild(print_btn);

            print_btn.addEventListener("click",()=>{
                console.log("hgbbh");
                const element = document.getElementById('data');
            const opt = {
                margin:       [10, 10, 10, 10], // top, right, bottom, left
                filename:     'custom.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
            };
            html2pdf().set(opt).from(element).save();
            })


        }
    } catch (error) {
        console.error("error is hh", error);
    }
});
