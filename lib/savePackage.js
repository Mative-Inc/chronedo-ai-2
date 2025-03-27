import Package from "@/models/package";
import connectDB from "./mongodb";


export const savePackage = async (packageData) => {
    try {
        await connectDB();
        const pack = await Package.findOne({ UserId: packageData.UserId }).sort({ createdAt: -1 }).limit(1);
        if (pack) {
            pack.name = packageData.name;
            pack.images += packageData.images;
            await pack.save();
            console.log('Package updated successfully:', pack);
            return;
        }
        const newPackage = new Package(packageData);
        await newPackage.save();
        console.log('Package saved successfully:', newPackage);
    } catch (error) {
        console.error('Error saving package:', error);
    }
};
