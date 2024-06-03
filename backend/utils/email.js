import Imap from "node-imap";

const imap = new Imap({
  user: "ryuzakideveloper@gmail.com",
  password: "vqax vmyv bkfa qbxs",
  host: "imap.gmail.com",
  port: 993,
  tls: true,
});

function openInbox(cb) {
  imap.openBox("INBOX", true, cb);
}

export function fetchConfirmationCode() {
  return new Promise((resolve, reject) => {
    let ans;

    imap.once("ready", function () {
      openInbox(function (err, box) {
        if (err) return reject(err);
        imap.search(["ALL"], function (err, results) {
          if (err) return reject(err);
          const f = imap.fetch(results, { bodies: "HEADER.FIELDS (SUBJECT)" });
          f.on("message", function (msg, seqno) {
            msg.on("body", function (stream, info) {
              let buffer = "";
              stream.on("data", function (chunk) {
                buffer += chunk.toString("utf8");
              });
              stream.once("end", function () {
                const subject = buffer.match(
                  "Your X confirmation code is (.*)"
                );
                if (subject) {
                  ans = subject[1];
                }
              });
            });
            msg.once("end", function () {});
          });
          f.once("error", function (err) {
            reject(err);
          });
          f.once("end", function () {
            imap.end();
          });
        });
      });
    });

    imap.once("error", function (err) {
      reject(err);
    });

    imap.once("end", function () {
      resolve(ans);
    });

    imap.connect();
  });
}
