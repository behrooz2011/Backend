// const axios = require("axios");
// const fs = require("fs");
// const csv = require("csv-parser");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// // const practiceController = async () => {
// //   console.log("-- practiceController --");
// //   try {
// //     const response = await axios.get(
// //       "https://jsonplaceholder.typicode.com/posts"
// //     );
// //     console.log("GET Response:", response.data[0]);
// //   } catch (error) {
// //     console.error("Error making GET request:", error);
// //   }
// // };
// // const post = async () => {
// //   const newPost = {
// //     title: "Hi",
// //     body: "There",
// //     userId: 1,
// //   };

// //   try {
// //     const response = await axios.post(
// //       "https://jsonplaceholder.typicode.com/posts",
// //       newPost
// //     );
// //     console.log("POST Response:", response.data);
// //   } catch (error) {
// //     console.error("Error making POST request:", error);
// //   }
// // };
// // practiceController();
// // post();

// //giver_name,giver_email,recipient_name,recipient_email
// const inputFile = "csv1.csv";
// const outputFile = "secret_santa.csv";
// function readTheFile(filepath) {
//   return new Promise((resolve, reject) => {
//     const participants = [];
//     fs.createReadStream(filepath)
//       .pipe(csv())
//       .on("data", (row) => {
//         // console.log(row);
//         participants.push(row);
//       })
//       .on("end", () => {
//         resolve(participants);
//       })
//       .on("error", (error) => {
//         reject(error);
//       });
//   });
// }
// readTheFile(inputFile);

// function writeOnTheFile(assignments, filepath) {
//   const csvWriter = createCsvWriter({
//     path: filepath,
//     header: [
//       {
//         id: "giver_name",
//         title: "giver_name",
//       },
//       {
//         id: "giver_email",
//         title: "giver_email",
//       },
//       {
//         id: "recipient_name",
//         title: "recipient_name",
//       },
//       {
//         id: "recipient_email",
//         title: "recipient_email",
//       },
//     ],
//   });
//   //   return csvWriter.writeRecords(assignments);
//   const records = [
//     {
//       giver_name: "John Doe",
//       giver_email: "john.doe@example.com",
//       recipient_name: "Jane Smith",
//       recipient_email: "jane.smith@example.com",
//     },
//     {
//       giver_name: "Alice Johnson",
//       giver_email: "alice.johnson@example.com",
//       recipient_name: "Bob Brown",
//       recipient_email: "bob.brown@example.com",
//     },
//     // Add more records as needed
//   ];

//   // Write records to the CSV file
//   csvWriter
//     .writeRecords(records)
//     .then(() => {
//       console.log("CSV file was written successfully");
//     })
//     .catch((error) => {
//       console.error("Error writing CSV file:", error);
//     });
// }

// writeOnTheFile(inputFile, outputFile);

///////////////////////////////////////
const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const inputFile = "csv1.csv";
const outputFile = "secret_santa.csv";

function readTheFile(filepath) {
  return new Promise((resolve, reject) => {
    const participants = [];
    fs.createReadStream(filepath)
      .pipe(csv())
      .on("data", (row) => {
        participants.push(row);
      })
      .on("end", () => {
        resolve(participants);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function writeOnTheFile(assignments, filepath) {
  const csvWriter = createCsvWriter({
    path: filepath,
    header: [
      { id: "giver_name", title: "giver_name" },
      { id: "giver_email", title: "giver_email" },
      { id: "recipient_name", title: "recipient_name" },
      { id: "recipient_email", title: "recipient_email" },
    ],
  });

  // Write records to the CSV file
  csvWriter
    .writeRecords(assignments)
    .then(() => {
      console.log("CSV file was written successfully");
    })
    .catch((error) => {
      console.error("Error writing CSV file:", error);
    });
}

// Read the CSV file and then write to another CSV file
readTheFile(inputFile)
  .then((participants) => {
    // Example logic to assign recipients
    const assignments = participants.map((giver, index) => {
      // Simple logic: assign the next participant as the recipient
      const recipientIndex = (index + 1) % participants.length; // Wrap around to the first participant
      const recipient = participants[recipientIndex];

      return {
        giver_name: giver.giver_name,
        giver_email: giver.giver_email,
        recipient_name: recipient.giver_name,
        recipient_email: recipient.giver_email,
      };
    });

    // Call the write function with the processed assignments
    writeOnTheFile(assignments, outputFile);
  })
  .catch((error) => {
    console.error("Error reading CSV file:", error);
  });
