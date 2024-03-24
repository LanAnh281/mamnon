const { grade, classRoom,course,Fee } = require("../models/index");
const ApiError = require("../api-error");
exports.create = async (req, res, next) => {
    const { name, description,price } = req.body;
    console.log("grade Body:", req.body);
    try {
        // thêm loại lớp mới
        const document = await grade.create({
            name: name,
            description: description
        });
        // thêm học phí cho loại lớp mới
        //1.Thêm niên khóa mới nhất (nếu chưa có)
        const now= new Date();
        //lấy năm hiện tại
        const currentYear= now.getFullYear();
        const pastYear= currentYear -1;
        console.log('Năm hiện tại:',currentYear,'Năm quá khứ:',pastYear);
        const findCourse= await course.findAll({});
        const filterCourse= findCourse.filter((item)=>item.name==`${pastYear}-${currentYear}`);
        console.log('Đã tồn tại niên khóa:',filterCourse);
        let newCourse='';
        if(filterCourse.length==0){
            // tạo niên khóa mới
           newCourse= await course.create({
                name:`${pastYear}-${currentYear}`,
                start:`8/${pastYear}`,
                end:`5/${currentYear}`
            })
            console.log('Đã tạo niên khóa mới:', newCourse);
        }else{
            newCourse= filterCourse[0]._id;
        }
        console.log('Mã niên khóa:',newCourse,document.dataValues._id);
        // thêm học phí 
        const createFee= await Fee.create({
            gradeId:document.dataValues._id,
            courseId:newCourse,
            money:price
        })
        console.log('Tạo học phí:',createFee);
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the role'))
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const documents = await grade.findAll({
            include: [{
                model: classRoom
            },{
                model:Fee
            }
        ]
        });
        return res.json({ message: documents, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding all the role'))
    }
};
exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const document = await grade.findOne({
            where: {
                _id: req.params.id,
            },
            include: {
                model: classRoom
            }
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
exports.findAllClass = async (req, res, next) => {
    try {
        console.log("params:",req.params.id);
        const document = await classRoom.findAll({
            where: {
                gradeId: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while finding  the role'))
    }
};
exports.updated = async (req, res, next) => {
    const { name, description } = req.body;
    console.log("Update grade", req.body);
    try {
        const document = await grade.update(
            {
                name: name,
                description: description
            },
            {
                where: {
                    _id: req.params.id,
                },
            }
        );
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while updating the role'))
    }
};
exports.delete = async (req, res, next) => {
    try {
        const document = await grade.destroy({
            where: {
                _id: req.params.id,
            },
        });
        return res.json({ message: document, status: "success" });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while deleting the role'))
    }
};

