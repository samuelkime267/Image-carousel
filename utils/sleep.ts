const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));

export default sleep;
