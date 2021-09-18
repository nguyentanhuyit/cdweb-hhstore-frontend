import React, { useState } from "react";
import { init, send } from "emailjs-com";
init("user_tIAOd6b6gOsVgoXljD3FZ");

const SendMail = () => {
  const [toSend, setToSend] = useState({
    to_name: "",
    message: "",
    to_email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send(
      "service_s4bg5fg",
      "template_93cmalq",
      toSend,
      "user_tIAOd6b6gOsVgoXljD3FZ"
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="to_name"
        placeholder="to name"
        value={toSend.to_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="message"
        placeholder="Your message"
        value={toSend.message}
        onChange={handleChange}
      />
      <input
        type="text"
        name="to_email"
        placeholder="To email"
        value={toSend.to_email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SendMail;
