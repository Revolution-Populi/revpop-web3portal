import TokenDistributionHandler from "./Command/TokenDistributionHandler";
import TokenDistributionRepository from "./Repository/TokenDistributionRepository";

const tokenDistributionRepository = new TokenDistributionRepository();

const tokenDistributionHandler = new TokenDistributionHandler(
    tokenDistributionRepository
);

export {tokenDistributionHandler};
