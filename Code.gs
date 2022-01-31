const PARENT_FOLDER_ID = '<DIR ID>';
const initialize = () => {
  const form = FormApp.getActiveForm();
  ScriptApp.newTrigger('onFormSubmit').forForm(form).onFormSubmit().create();
};

const onFormSubmit = ({ response } = {}) => {
  try {
    // Get a list of all files uploaded with the response
    const files = response
      .getItemResponses()
      // We are only interested in File Upload type of questions
      .filter((itemResponse) => itemResponse.getItem().getType().toString() === 'FILE_UPLOAD')
      .map((itemResponse) => itemResponse.getResponse())
      // The response includes the file ids in an array that we can flatten
      .reduce((a, b) => [...a, ...b], []);

    if (files.length > 0) {
      // Each form response has a unique Id
      var formResponse = response;
  var itemResponses = formResponse.getItemResponses();

  for (var i=0; i<itemResponses.length; i++) {
    switch (itemResponses[i].getItem().getTitle()) {
      case "name":
        var email = itemResponses[i].getResponse();  // returns a string
        Logger.log(email);
        break;
      
    }
  }  
      const subfolderName = email;
      const parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID);
      const subfolder = parentFolder.createFolder(subfolderName);
      files.forEach((fileId) => {
        // Move each file into the custom folder
        DriveApp.getFileById(fileId).moveTo(subfolder);
      });
    }
  } catch (f) {
    Logger.log(f);
  }
};
