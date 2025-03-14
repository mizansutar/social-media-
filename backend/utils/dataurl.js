
import datauriParser from "datauri/parser.js";
import path from "path"

const parser = new datauriParser();
const getDatauli = (file) => {
    const extname = path.extname(File.originalname).toString();
    return parser.format(extname, File.buffer).content;
}
export default getDatauli;