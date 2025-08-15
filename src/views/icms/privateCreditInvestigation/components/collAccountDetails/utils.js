/**
 * 格式化时间
 * formatted yyyy-mm-dd or yyyymmdd or yyyy/mm/dd or yyyy年mm月dd日
 * according to yyyymmdd or yyyy/mm/dd or yyyy年mm月dd日
 * otherwise, param is returned
 * @param type 0=return yyyy-mm-dd、1=return yyyymmdd、2=return yyyy/mm/dd、3=return yyyy年mm月dd日、4=return mm/dd
 * @param param
 */
export function formatDate(type, param) {
    const resultList = [
        "$1-$2-$3",
        "$1$2$3",
        "$1/$2/$3",
        "$1年$2月$3日",
        "$2/$3",
    ];
    const patternList = [
        /^(\d{4})-(\d{2})-(\d{2})$/,
        /^(\d{4})(\d{2})(\d{2})$/,
        /^(\d{4})\/(\d{2})\/(\d{2})$/,
        /^(\d{4})年(\d{2})月(\d{2})日$/,
    ];
    let item = patternList.find((item) => {
        return item.test(param);
    });

    return param.replace(item, resultList[type]);
}

/**
 * 处理月份数据，去掉前缀0
 * @parma
 */
export function formatMonth(param) {
    if (/^0\/d+$/.test(param)) {
        return (param + "").replace("^0+", "");
    } else {
        return param;
    }
}

/**
 * 账户类型 && 账户状态 和展示表单的映射关系
 * 如果有新增映射关系，需要在这里定义
 * 账户类型
 * D1-非循环贷账户
 * R1-循环贷账户
 * R2-贷记卡账户
 * R3-准贷记卡账户
 * R4-循环额度下分账户
 * C1-催收账户
 *
 * 账户状态
 * 1 正常
 * 2 逾期
 * 3 结清
 * 4 呆账
 * 5 转出
 * 6 担保物不足
 * 7 强制平仓
 * 8 司法追偿
 *
 */
export const accountTypeAndStatusFormMap = new Map([
    [
        "D1",
        new Map([
            [
                1,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                2,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                3,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType3",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                4,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType1",
                    "AccountRepaymentHistory",
                ]),
            ],
            [5, new Set([])],
            [6, new Set([])],
            [7, new Set([])],
            [
                8,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
        ]),
    ],
    [
        "R1",
        new Map([
            [
                1,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                2,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                3,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType3",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                4,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType1",
                    "AccountRepaymentHistory",
                ]),
            ],
            [5, new Set([])],
            [6, new Set([])],
            [7, new Set([])],
            [
                8,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
        ]),
    ],
    [
        "R2",
        new Map([
            [
                1,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType5",
                    "AccountRepayInfoHistory",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                31,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType5",
                    "AccountRepayInfoHistory",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                4,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType4",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                5,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType1",
                    "AccountRepaymentHistory",
                ]),
            ],
            [
                6,
                new Set([
                    "AccountBasicInfo3",
                ]),
            ],
            // [5, new Set([])],
            // [6, new Set([])],
            // [7, new Set([])],
            [
                8,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType5",
                    "AccountRepayInfoHistory",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
        ]),
    ],
    [
        "R3",
        new Map([
            [
                1,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType5",
                    "AccountRepayInfoHistory",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                31,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType5",
                    "AccountRepayInfoHistory",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                4,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType4",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                5,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType1",
                    "AccountRepaymentHistory",
                ]),
            ],
            [
                6,
                new Set([
                    "AccountBasicInfo3",
                ]),
            ],
            // [5, new Set([])],
            // [6, new Set([])],
            // [7, new Set([])],
            [
                8,
                new Set([
                    "AccountBasicInfo2",
                    "AccountAdditionalInfoType5",
                    "AccountRepayInfoHistory",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
        ]),
    ],
    [
        "R4",
        new Map([
            [
                1,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                2,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                3,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType3",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
            [
                4,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType1",
                    "AccountRepaymentHistory",
                ]),
            ],
            [5, new Set([])],
            [6, new Set([])],
            [7, new Set([])],
            [
                8,
                new Set([
                    "AccountBasicInfo",
                    "AccountAdditionalInfoType2",
                    "AccountCurrentRepaymentHistory",
                    "AccountRepaymentHistory",
                    "AccountSpecialRepaymentHistory",
                ]),
            ],
        ]),
    ],
    [
        "C1",
        new Map([
            [
                1,
                new Set([
                    "CollAccountAdditionalInfoType",
                ]),
            ],
            [
                2,
                new Set([
                    "CollAccountAdditionalInfoType2",
                ]),
            ],
        ]),
    ],
]);
