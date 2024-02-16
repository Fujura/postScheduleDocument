import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loading } from "./Loading";

export const InputForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [postingData, setPostingData] = useState(false);

  const handleFileChange = (e) => {
    const { files } = e.target;

    if (files?.length) {
      const { type } = files[0];
      if (
        type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        console.log(files[0]);
        setSelectedFile(files[0]);
      } else {
        console.error("error");
      }
    }
  };

  const submitFileHandler = async (e) => {
    e.preventDefault();
    setPostingData(true);
    console.log(selectedFile);

    var formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      console.log("ok");
      setPostingData(false);
    } catch (error) {
      console.log(error);
      setPostingData(false);
    }
    console.log("ОТРАБОТКА");
  };

  useEffect(() => {
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString("en-CA");

    console.log(formattedDate);
    (async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/get_schedule/${formattedDate}.json`);
      console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      
    })()
  }, []);

  return (
    <>
      {postingData ? (
        <Loading />
      ) : (
        <form
          onSubmit={submitFileHandler}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{ margin: "15px 0" }}
          />
          <button type="submit">Отправить</button>
        </form>
      )}
    </>
  );
};
