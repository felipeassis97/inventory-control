import { IBannerRepository } from "./IBannerRepository";
import { Banner } from "../../../models/response/Banner";
import { IDatabaseService } from "../../../../common/services/db/IDatabaseService";

export class BannerRepository implements IBannerRepository {
    private database: IDatabaseService<Banner>;

    constructor(database: IDatabaseService<Banner>) {
        this.database = database;
    }

    async fetchBanners(): Promise<Banner[]> {
        return await this.database.getAll('SELECT * FROM banners');
    }
}