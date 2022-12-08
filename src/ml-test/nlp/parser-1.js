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
        .trim()}`;
      entries[word] = {
        og: og,
      };
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
