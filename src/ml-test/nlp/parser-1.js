const fs = require("fs");
const path = require("path");
const util = require("util");
// const uuid = require("uuid");

const deDupe = (pages) => {
  const letter = (i) => String.fromCharCode(65 + i).toLowerCase();
  let totalBefore = 0;
  let totalAfter = 0;
  let dictionary = [];

  pages.forEach((page, i) => {
    // if (i !== 1) return;
    let entries = {};
    totalBefore += page.length;
    page = page.filter((entry, j) => {
      return entry.indexOf("PREPENDED TO NEXT ENTRY") === -1 && j !== 0;
      // console.log(entry);
    });

    page.forEach((entry, j) => {
      let startBold = entry.indexOf("<b>");
      let endBold = entry.indexOf("</b>");
      let word = entry.slice(startBold + 3, endBold).toLowerCase();

      if (entries[word]) {
        let startSup = entry.indexOf("<sup>");
        let endSup = entry.indexOf("</sup>");
        let sup = entry.slice(startSup, endSup + 6);
        word = word += sup;
      }
      const og = `<p>${entry
        .replaceAll("\n<b></b>", "")
        .replaceAll("\n</font>", "")
        .replaceAll("\n<b>\n\n</b>", "")
        .replaceAll("\n", " ")
        .replaceAll("<p> ", "<p>")
        .replaceAll(" <p>", "<p>")
        .replaceAll("</p> ", "</p>")
        .replaceAll(" </p>", "</p>")
        .replaceAll("<p></p> ", "")
        .replaceAll("<p></p>", "")
        .replaceAll(" <b>", "<b>")
        .replaceAll("<b> ", "<b>")
        .replaceAll(" </b>", "</b>")
        .replaceAll("/<b> ", "</b>")
        .replaceAll("<b></b> ", "")
        .replaceAll("<b></b>", "")
        .replaceAll(" <i>", "<i>")
        .replaceAll("<i> ", "<i>")
        .replaceAll(" </i>", "</i>")
        .replaceAll("</i> ", "</i>")
        .replaceAll("<i></i> ", "")
        .replaceAll("<i></i>", "")
        .replaceAll("PREPENDED", "")
        .replaceAll("&nbsp;", "")
        .replaceAll('<p align="RIGHT">', "")
        .trim()}`;

      const synonyms = [];

      if (
        og.includes("(<i>t") &&
        og.includes("</i>)") &&
        og.includes("</b>.") &&
        og.indexOf("(<i>t") < og.lastIndexOf("</b>.") + 5
      ) {
        const synonymsStr = og.substring(
          og.indexOf("(<i>t"),
          og.lastIndexOf("</b>.") + 5
        ); //.replace('</b>.', '</br>');
        const synonymsStrSplit = synonymsStr
          .replaceAll("<p>", "")
          .replaceAll("</p>", "")
          .replaceAll("<b></b>", "")
          .split(";");
        synonymsStrSplit.forEach((x1) => {
          x1.split(",").forEach((x) => {
            x.split(".").forEach((s) => {
              if (
                s.trim().includes("(<i>t") &&
                s.trim().includes("</i>)") &&
                s.trim().includes("<b>") &&
                s.trim().includes("</b>")
              ) {
                console.log("synonymsStr", s.trim());
                // console.log("\n");
                const ss = s.trim().split(")");
                const k = ss[0].trim();
                const v = ss[1].trim();
                const synonym = {
                  type: k
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll("<i>", "")
                    .replaceAll("</i>", "")
                    .trim(),
                  synonym: v
                    .replaceAll(".", "")
                    .replaceAll("<b>", "")
                    .replaceAll("</b>", "")
                    .trim(),
                };
                console.log("synonym", synonym);
                synonyms.push(synonym);
              }
            });
          });
        });
      }

      entries[word] = {
        og: og,
      };
      if (synonyms.length > 0) {
        entries[word].synonyms = synonyms;
      }
    });
    // console.log(dictionary);
    // console.log(util.inspect(entries, { depth: null, colors: true }));

    // const _outputData = fs.readFileSync(path.join(__dirname, outputFile), 'utf-8');
    // const outputData = JSON.parse(_outputData);
    // // const l = letter(i);
    // // const leterObj = {
    // //     l: JSON.stringify(entries)
    // // }
    // outputData.push(JSON.stringify(entries));
    dictionary.push(entries);

    // fs.writeFile(path.join(__dirname, outputFile), JSON.stringify(outputData), 'utf-8', (error) => {
    //     if (error) {
    //         console.log(error);
    //     }
    // });

    // fs.writeFile(
    //   `./dictionary/eng-swa/eng-swa-${letter(i)}-entries.json`,
    //   // `./dict-objects/swa-eng/swa-eng-${letter(i)}-entries.json`,
    //   JSON.stringify(entries),
    //   "utf-8",
    //   err => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       // resolve();
    //     }
    //   }
    // );
    totalAfter += page.length;

    console.log("AFTER:", page.length);
    console.log("\n");
  });

  console.log("BEFORE:", totalBefore.toLocaleString());
  console.log("AFTER:", totalAfter.toLocaleString());

  return dictionary;
};

console.log("ENG-SWA:");
const dict1 = deDupe(require("./eng-sw-1.json"));
if (dict1 && dict1.length > 0) {
  const o = JSON.stringify(dict1);
  fs.writeFile(
    path.join(__dirname, "eng-sw-output.json"),
    o,
    "utf-8",
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
}
console.log("\n");
console.log("SWA-ENG:");
const dict2 = deDupe(require("./sw-eng-1.json"));
if (dict2 && dict2.length > 0) {
  const o = JSON.stringify(dict2);
  fs.writeFile(
    path.join(__dirname, "sw-eng-output.json"),
    o,
    "utf-8",
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
}
