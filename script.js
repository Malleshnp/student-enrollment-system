// ------------------------------------
// JPDB DETAILS
// ------------------------------------

const connToken = "90935194|-31949243324302891|90958740";

const dbName = "SCHOOL-DB";

const relationName = "STUDENT-TABLE";

const baseURL = "http://api.login2explore.com:5577";

let recNo = null;


// ------------------------------------
// PAGE LOAD
// ------------------------------------

window.onload = function () {

    resetForm();
    populateStudentList();
};


// ------------------------------------
// RESET FORM
// ------------------------------------

function resetForm() {

    document.getElementById("rollNo").value = "";

    document.getElementById("fullName").value = "";

    document.getElementById("studentClass").value = "";

    document.getElementById("birthDate").value = "";

    document.getElementById("address").value = "";

    document.getElementById("enrollmentDate").value = "";

    document.getElementById("vacateDate").value = "";

    document.getElementById("vacateDiv").style.display =
    "none";

    document.getElementById("saveBtn").disabled = false;

    document.getElementById("resetBtn").disabled = false;

    document.getElementById("updateBtn").disabled = true;

    document.getElementById("deleteBtn").disabled = true;

    document.getElementById("rollNo").disabled = false;

    document.getElementById("fullName").disabled = false;

    document.getElementById("rollNo").focus();

    recNo = null;
}


// ------------------------------------
// CHECK ROLL NUMBER
// ------------------------------------

document.getElementById("rollNo")
.addEventListener("blur", checkRollNo);


function checkRollNo() {

    let rollNo =
    document.getElementById("rollNo").value;

    if (rollNo === "") {

        return;
    }

    let getRequest =
    createGET_BY_KEYRequest(
        connToken,
        dbName,
        relationName,
        JSON.stringify({
            "Roll-No": rollNo
        })
    );

    jQuery.ajaxSetup({ async: false });

    let resultObj =
    executeCommandAtGivenBaseUrl(
        getRequest,
        baseURL,
        "/api/irl"
    );

    jQuery.ajaxSetup({ async: true });

    let data =
    JSON.parse(resultObj.data);

    // --------------------------------
    // NEW STUDENT
    // --------------------------------

    if (data.rec_no == null) {

        document.getElementById("saveBtn").disabled =
        false;

        document.getElementById("updateBtn").disabled =
        true;

        document.getElementById("deleteBtn").disabled =
        true;
    }

    // --------------------------------
    // EXISTING STUDENT
    // --------------------------------

    else {

        recNo = data.rec_no;

        let student =
        JSON.parse(data.record);

        document.getElementById("fullName").value =
        student["Full-Name"];

        document.getElementById("studentClass").value =
        student["Class"];

        document.getElementById("birthDate").value =
        student["Birth-Date"];

        document.getElementById("address").value =
        student["Address"];

        document.getElementById("enrollmentDate").value =
        student["Enrollment-Date"];

        document.getElementById("vacateDate").value =
        student["Vacate-Date"] || "";

        // Vacate Visible

        document.getElementById("vacateDiv").style.display =
        "block";

        // Disable Name Change

        document.getElementById("fullName").disabled =
        true;

        // Buttons

        document.getElementById("saveBtn").disabled = false;

        document.getElementById("resetBtn").disabled = false;

        document.getElementById("updateBtn").disabled = true;

        document.getElementById("deleteBtn").disabled = true;
    }
}


// ------------------------------------
// VALIDATE
// ------------------------------------

function validateForm() {

    if (
        document.getElementById("rollNo").value === "" ||
        document.getElementById("fullName").value === "" ||
        document.getElementById("studentClass").value === "" ||
        document.getElementById("birthDate").value === "" ||
        document.getElementById("address").value === "" ||
        document.getElementById("enrollmentDate").value === ""
    ) {

        alert("All fields required");

        return false;
    }

    return true;
}


// ------------------------------------
// SAVE
// ------------------------------------

document.getElementById("saveBtn")
.addEventListener("click", saveData);

function saveData() {

    if (!validateForm()) {

        return;
    }

    let jsonObj = {

        "Roll-No":
        document.getElementById("rollNo").value,

        "Full-Name":
        document.getElementById("fullName").value,

        "Class":
        document.getElementById("studentClass").value,

        "Birth-Date":
        document.getElementById("birthDate").value,

        "Address":
        document.getElementById("address").value,

        "Enrollment-Date":
        document.getElementById("enrollmentDate").value
    };

    let putRequest =
    createPUTRequest(
        connToken,
        JSON.stringify(jsonObj),
        dbName,
        relationName
    );

    jQuery.ajaxSetup({ async: false });

    executeCommandAtGivenBaseUrl(
        putRequest,
        baseURL,
        "/api/iml"
    );

    jQuery.ajaxSetup({ async: true });

    alert("Student Saved");

    resetForm();

    populateStudentList();
}


// ------------------------------------
// UPDATE
// ------------------------------------

document.getElementById("updateBtn")
.addEventListener("click", updateData);

function updateData() {

    if (!validateForm()) {

        return;
    }

    let jsonObj = {

        "Roll-No":
        document.getElementById("rollNo").value,

        "Full-Name":
        document.getElementById("fullName").value,

        "Class":
        document.getElementById("studentClass").value,

        "Birth-Date":
        document.getElementById("birthDate").value,

        "Address":
        document.getElementById("address").value,

        "Enrollment-Date":
        document.getElementById("enrollmentDate").value,

        "Vacate-Date":
        document.getElementById("vacateDate").value
    };

    let updateRequest =
    createUPDATERecordRequest(
        connToken,
        JSON.stringify(jsonObj),
        dbName,
        relationName,
        recNo
    );

    jQuery.ajaxSetup({ async: false });

    executeCommandAtGivenBaseUrl(
        updateRequest,
        baseURL,
        "/api/iml"
    );

    jQuery.ajaxSetup({ async: true });

    alert("Student Updated");

    resetForm();

    populateStudentList();
}


// ------------------------------------
// DELETE
// ------------------------------------

document.getElementById("deleteBtn")
.addEventListener("click", deleteData);

function deleteData() {

    let deleteRequest =
    createREMOVERecordRequest(
        connToken,
        dbName,
        relationName,
        recNo
    );

    jQuery.ajaxSetup({ async: false });

    executeCommandAtGivenBaseUrl(
        deleteRequest,
        baseURL,
        "/api/iml"
    );

    jQuery.ajaxSetup({ async: true });

    alert("Student Deleted");

    resetForm();

    populateStudentList();
}


// ------------------------------------
// VIEW STUDENTS
// ------------------------------------

document.getElementById("viewBtn")
.addEventListener("click", viewStudents);

document.getElementById("resetBtn")
.addEventListener("click", resetForm);

document.getElementById("studentModalClose")
.addEventListener("click", closeStudentModal);

document.getElementById("studentModalCloseFooter")
.addEventListener("click", closeStudentModal);

function closeStudentModal() {
    document.getElementById("studentModal").classList.remove("show");
}

function showStudentModal(output) {
    document.getElementById("studentModalBody").innerHTML = output;
    document.getElementById("studentModal").classList.add("show");
}

async function fetchStudentRecords() {

    let getRequest =
    createGETALLRecordRequest(
        connToken,
        dbName,
        relationName,
        1,
        100
    );

    let response = await fetch(baseURL + "/api/irl", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: getRequest
    });

    let resultText = await response.text();
    let resultObj;

    try {
        resultObj = JSON.parse(resultText);
    } catch (e) {
        return [];
    }

    let data;
    if (typeof resultObj.data === "string") {
        try {
            data = JSON.parse(resultObj.data);
        } catch (e) {
            return [];
        }
    } else {
        data = resultObj.data;
    }

    return data && (data.records || data.json_records) ? (data.records || data.json_records) : [];
}

function renderStudentList(records, containerId, title) {
    let output = `<h4 class="mb-3">${title}</h4>`;

    if (!records || records.length === 0) {
        output += "<p>No students found yet.</p>";
    } else {
        records.reverse();

        for (let i = 0; i < records.length; i++) {
            let student =
            typeof records[i].record === "string"
                ? JSON.parse(records[i].record)
                : records[i].record;

            output += `
            <div class="card p-3 mb-2">
                <h5>${student["Full-Name"]}</h5>
                <p>Roll: ${student["Roll-No"]}</p>
                <button class="btn btn-primary btn-sm" onclick='loadStudent(${JSON.stringify(student)}, ${records[i].rec_no}); closeStudentModal();'>
                    Edit
                </button>
            </div>
            `;
        }
    }

    document.getElementById(containerId).innerHTML = output;
}

async function populateStudentList() {
    let records = await fetchStudentRecords();
    renderStudentList(records, "studentList", "All Saved Students");
}

async function viewStudents() {
    let records = await fetchStudentRecords();
    renderStudentList(records, "studentModalBody", "All Students");
    document.getElementById("studentModal").classList.add("show");
}


// ------------------------------------
// LOAD STUDENT
// ------------------------------------

function loadStudent(student, recordNumber) {

    recNo = recordNumber;

    document.getElementById("rollNo").value =
    student["Roll-No"];

    document.getElementById("fullName").value =
    student["Full-Name"];

    document.getElementById("studentClass").value =
    student["Class"];

    document.getElementById("birthDate").value =
    student["Birth-Date"];

    document.getElementById("address").value =
    student["Address"];

    document.getElementById("enrollmentDate").value =
    student["Enrollment-Date"];

    document.getElementById("vacateDate").value =
    student["Vacate-Date"] || "";

    document.getElementById("vacateDiv").style.display =
    "block";

    document.getElementById("rollNo").disabled =
    true;

    document.getElementById("fullName").disabled =
    true;

    document.getElementById("saveBtn").disabled =
    true;

    document.getElementById("updateBtn").disabled =
    false;

    document.getElementById("deleteBtn").disabled =
    false;
}