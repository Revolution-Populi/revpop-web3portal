var fs = require("fs");
var path = require("path");
const md5File = require("md5-file");
const http = require("https");
const {exec} = require("child_process");
var extract = require("extract-zip");

function getMD5Digest(file) {
    const hash = md5File.sync(file);
    return hash.toUpperCase();
}

const dir = path.join(__dirname, "charting_library");
var outputFileName = "charting_library.17.025.02b61a1c.zip";
var outputFilePath = path.join(dir, outputFileName);
const outputFile = fs.createWriteStream(outputFilePath);

http.get("https://bitshares.org/assets/" + outputFileName, response => {
    response.pipe(outputFile);
}).on("error", err => {
    console.error("Failed to download charting_library archive");
    console.error(err);
    throw err;
});

outputFile.on("finish", () => {
    const actualDigest = getMD5Digest(outputFilePath);
    const expectedDigest = fs
        .readFileSync(outputFilePath + ".md5")
        .toString()
        .trim();
    if (actualDigest !== expectedDigest) {
        fs.unlinkSync(outputFilePath);
        throw new Error(
            "MD5 of downloaded file (" +
                actualDigest +
                ") not matches expected (" +
                expectedDigest +
                ")"
        );
    }
    console.log("MD5 digest validated, extracting library...");
    extract(outputFilePath, {dir}, function(err) {
        if (err) {
            console.error("Decompress error!", err);
        }
    });
});
