import { Banner } from "../../../models/response/Banner";

export interface IBannerRepository {
    fetchBanners(): Promise<Banner[]>;
}

