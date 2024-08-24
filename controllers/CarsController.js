const catchAsync = require('../utils/catchAsync');
const admin = require('firebase-admin');

exports.getAll = catchAsync(async (req, res, next) => {
    try {
        const ref = admin.firestore().collection('cars');
        const snapshot = await ref.get();
        const data = [];

        snapshot.forEach(doc => {
            data.push(doc.data());
        });

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.getById = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id;
        const ref = admin.firestore().collection('cars').doc(id);

        const car = (await ref.get()).data();

        if (!car) {
            throw new Error('Car not found');
        }

        res.status(200).json(car);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.setStatus = catchAsync(async (req, res, next) => {
    try {
        const {
            data,
        } = req.body;

        const ref = admin.firestore().collection('cars').doc(data.id);
        const el = (await ref.get()).data();

        if (!el) {
            throw new Error('Car not found');
        }

        await ref.update({
            status: data.status,
        }).then(() => {
            console.log('Car status updated');
        });

        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.update = catchAsync(async (req, res, next) => {
    try {
        const {
            data,
            deletedImages
        } = req.body;

        const bucket = admin.storage().bucket();
        const ref = admin.firestore().collection('cars');
        const carRef = admin.firestore().collection('cars').doc(data.id);

        const car = await carRef.get();

        if (car.exists) {
            carRef.update(data);
            console.log(`Car with id ${data.id} was updated`);
        } else {
            ref.doc(data.id).set(data);
            console.log(`Car was created with id ${data.id}`)
        }

        if (deletedImages && deletedImages.length > 0) {
            const promises = deletedImages.map(async (img) => {
                const fileToDelete = bucket.file(img);

                const [exists] = await fileToDelete.exists();

                if (exists) {
                    await fileToDelete.delete();
                    console.log(`Image deleted successfully from ${img.url}`);
                } else {
                    console.error(`Image does not exist at ${img.url}`);
                }
            });

            await Promise.all(promises);
        }

        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
})

exports.uploadImages = catchAsync(async (req, res, next) => {
    try {
        const files = req.files;
        const content = req.params.content;
        const id = req.params.id;
        const order = req.params.order;

        let urls = [];
        const ref = admin.firestore().collection('cars').doc(id);
        const car = await ref.get();
        const bucket = admin.storage().bucket();

        const promises = files.map(async (file, index) => {
            const uniqueFilename = `${new Date().getTime()}${Math.random().toString(36).substring(2, 8)}${file.originalname}`;
            const destination = `${id}/${uniqueFilename.toUpperCase()}`
            await bucket.upload(file.path, {
                destination
            })
            console.log(`Image ${file.originalname} uploaded successfully to ${content}/${id}/`);
            const [url] = await bucket.file(destination).getSignedUrl({
                action: 'read',
                expires: '01-01-2100',
            });
            urls.push({
                url,
                order: index + parseInt(order),
                path: destination
            });
        });

        await Promise.all(promises);

        if (car.exists) {
            const doc = car.data();
            const imagesArr = doc.images || [];
            imagesArr.push(...urls);

            await ref.update({
                images: imagesArr
            })
            console.log(`Images URLs added to 'images' array in Firestore for document with content ID: ${id}`);

            res.status(200).json({
                status: 'success',
            });
        } else {
            console.error(`No document found with content ID: ${id}`);

            const deletePromises = urls.map(async (image) => {
                try {
                    await bucket.file(image.path).delete();
                    console.log(`Image ${image.path} deleted successfully`);
                } catch (error) {
                    console.error(`Error deleting image ${image.path}:`, error);
                }
            });

            await Promise.all(deletePromises);
            console.log(`Uploaded images deleted`);

            res.status(400).send(`No document found with content ID: ${id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.delete = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id;

        const bucket = admin.storage().bucket();
        const folderPath = id;

        const ref = admin.firestore().collection('cars').doc(id);
        const car = await ref.get();

        if (!car.exists) {
            return res.status(404).json({
                status: 'error',
                message: 'Car not found'
            });
        }

        await ref.delete();
        console.log(`Car ${id} Deleted`)

        const [files] = await bucket.getFiles({
            prefix: folderPath
        });

        const deletePromises = files.map(async (file) => {
            await file.delete();
        });

        await Promise.all(deletePromises);

        await bucket.deleteFiles({
            prefix: folderPath
        });
        console.log(`Folder ${id} deleted`);

        res.status(200).json({
            status: 'success',
            message: `Car ${id} deleted successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.showOnBanner = catchAsync(async (req, res, next) => {
    try {
        const {
            data,
        } = req.body;

        const ref = admin.firestore().collection('cars').doc(data.id);
        const el = (await ref.get()).data();

        if (!el) {
            throw new Error('Car not found');
        }

        await ref.update({
            showOnBanner: data.showOnBanner,
        }).then(() => {
            console.log('Car status updated');
        });

        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});