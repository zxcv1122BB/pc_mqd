"use strict";

var countUtils = {
    // 三码、前二码、后二码直选复式     an=n1*n2*...
    getDirectCount: function getDirectCount(obj) {
        var pre = 1;
        for (var key in obj) {
            pre *= obj[key];
        }
        return pre;
    },
    // 三码、二码直选和值   type 类型  2 二码  3 三码  max 每一位最高选几
    getThreeSum: function getThreeSum(type, max, num) {
        var count = 0;
        for (var k = 0; k < max; k++) {
            for (var i = 0; i < max; i++) {
                if (type == 2) {
                    if (num == k + i) {
                        count++;
                    }
                } else {
                    for (var j = 0; j < max; j++) {
                        if (num == k + i + j) {
                            count++;
                        }
                    }
                }
            }
        }
        return count;
    },
    //三码组三（至少2项）   count 选择项的总项数   min 最少选择多少项才开始计算   2/6/12/20/30/42/56
    getThreeGrounpDirect: function getThreeGrounpDirect(count, min) {
        if (count >= min) {
            return count * (count - 1);
        } else {
            return 0;
        }
    },
    // 三码组六(至少3项)  1/4/10/20/35/56/84/120 参数同上  n(n+1)(n+2)/6 
    getSixGroupDirect: function getSixGroupDirect(count, min) {
        if (count >= min) {
            count = count - 2;
            return count * (count + 1) * (count + 2) / 6;
        } else {
            return 0;
        }
    },
    // 后二码/前二码组选复式（至少2项） 1/3/6/10/15
    getBcGroupMix: function getBcGroupMix(count, min) {
        if (count >= min) {
            count = count - 1;
            return count * (count + 1) / 2;
        } else {
            return 0;
        }
    },
    // 计算组三和值的组数    有且只有两位数字相同的
    getGroupThree: function getGroupThree(num, max) {
        var count = 0;
        for (var i = 0; i < max; i++) {
            for (var j = i + 1; j < max; j++) {
                if (i + j + j == num || i + i + j == num) {
                    count++;
                }
            }
        }
        return count;
    },
    // 计算组六的和值
    getGroupSix: function getGroupSix(num) {
        var numArr = [];
        var count = 0;
        for (var i = 0; i < 10; i++) {
            for (var j = i + 1; j < 10; j++) {
                for (var k = j + 1; k < 10; k++) {
                    if (i != j && j != k && k != i) {
                        if (i + j + k == num) {
                            count++;
                        }
                    }
                }
            }
        }
        return count;
    },

    // 后二码/前二码组选复式（至少2项） 1/3/6/10/15
    getBcGroupMix_cqssc: function getBcGroupMix_cqssc(count, min) {
        var n = 1;
        for (var i = 1; i < count + 1; i++) {
            n *= i;
        }
        for (var i = 1; i < min + 1; i++) {
            n /= i;
        }
        for (var i = 1; i < count - min + 1; i++) {
            n /= i;
        }
        if (count >= min) {
            //          count=count-1;
            //          return count*(count+1)/min;
            return n;
        } else {
            return 0;
        }
    },
    // 三码、二码直选跨度   type 类型  2 二码  3 三码  max 每一位最高选几
    getTwoThreeSpacing: function getTwoThreeSpacing(type, max, num) {
        var count = 0,
            n1,
            n2,
            n3,
            list = [];
        for (var k = 0; k < max; k++) {
            n1 = k;
            for (var i = 0; i < max; i++) {
                n2 = i;
                if (type == 2) {
                    if (num == Math.abs(k - i)) {
                        count++;
                    }
                } else {
                    for (var j = 0; j < max; j++) {
                        n3 = j;
                        list = [n1, n2, n3];
                        list.sort(function (a, b) {
                            return b - a;
                        });
                        if (num == list[0] - list[2]) {
                            count++;
                        }
                    }
                }
            }
        }
        return count;
    },

    // 三码、二码组选和值   type 类型  2 二码  3 三码  max 每一位最高选几,index--0为组三，1--组六
    getThreeGroupSum: function getThreeGroupSum(type, max, num, index) {
        var count = 0,
            olist = [],
            list = [],
            str;
        for (var k = 0; k < max; k++) {
            for (var i = 0; i < max; i++) {
                if (type == 2) {
                    if (num == k + i && !(k == i)) {
                        list = [k, i];
                        list.sort(function (a, b) {
                            return a - b;
                        });
                        str = list.join(",");
                        if (olist.length == 0) {
                            olist.push(str);
                            count++;
                        } else {
                            for (var m = 0, len4 = olist.length; m < len4; m++) {
                                if (olist[m] == str) {
                                    break;
                                } else if (m == olist.length - 1) {
                                    olist.push(str);
                                    count++;
                                }
                            }
                        };
                    }
                } else {
                    var countNumber = function countNumber(k, i, j) {
                        list = [k, i, j];
                        list.sort(function (a, b) {
                            return a - b;
                        });
                        str = list.join(",");
                        if (olist.length == 0) {
                            olist.push(str);
                            count++;
                        } else {
                            for (var m = 0, len4 = olist.length; m < len4; m++) {
                                if (olist[m] == str) {
                                    break;
                                } else if (m == olist.length - 1) {
                                    olist.push(str);
                                    count++;
                                }
                            }
                        };
                    };

                    if (index == 0) {
                        //组三
                        for (var j = 0; j < max; j++) {
                            if (num == k + i + j && !(k == i && i == j) && (k == i || k == j || i == j)) {
                                countNumber(k, i, j);
                            }
                        }
                    } else if (index == 1) {
                        //组六
                        for (var j = 0; j < max; j++) {
                            if (num == k + i + j && k != i && i != j && k != j) {
                                countNumber(k, i, j);
                            }
                        }
                    } else {
                        for (var j = 0; j < max; j++) {
                            if (num == k + i + j && !(k == i && i == j)) {
                                countNumber(k, i, j);
                            }
                        }
                    }
                };
            }
        }
        return count;
    },
    //任选二，任选三，任选4的直选复式
    calculateNum: function calculateNum(indexList, lenList) {
        var sumNum = 0,
            that = this;
        for (var i = 0, len1 = indexList.length; i < len1; i++) {
            switch (indexList[i]) {
                case 1:
                    for (var j = 0, len = lenList.length; j < len; j++) {
                        sumNum += lenList[j];
                    }
                    break;
                case 2:
                    //2串1
                    for (var j = 0, len = lenList.length; j < len - 1; j++) {
                        var k = j + 1;
                        do {
                            sumNum += lenList[j] * lenList[k];
                            k++;
                        } while (k < len);
                    }
                    break;
                case 3:
                    //3串1
                    for (var j = 0, len = lenList.length; j < len - 2; j++) {
                        var k = j + 1,
                            l = j + 2;
                        do {
                            do {
                                sumNum += lenList[j] * lenList[k] * lenList[l];
                                l++;
                            } while (l < len);
                            k++, l = k + 1;
                        } while (k < len - 1);
                    }
                    break;
                case 4:
                    //4串1
                    for (var j = 0, len = lenList.length; j < len - 3; j++) {
                        var k = j + 1,
                            l = j + 2,
                            m = j + 3;
                        do {
                            do {
                                do {
                                    sumNum += lenList[j] * lenList[k] * lenList[l] * lenList[m];
                                    m++;
                                } while (m < len);
                                l++, m = l + 1;
                            } while (l < len - 1);
                            k++, l = k + 1, m = k + 2;
                        } while (k < len - 2);
                    }
                    break;
            }
        }
        return sumNum;
    }
};