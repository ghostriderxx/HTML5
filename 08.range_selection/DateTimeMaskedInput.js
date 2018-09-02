﻿var SDateTimeMaskConfig = {
    defaultFormatString: "yyyy-MM-dd",

    defaultLeastYear: 0000,
    defaultMaxYear: 9999,

    numberChar: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    decollatorChar: [":", "-", "/", " "],


    // 可用的功能键值数组.
    WORK_KEY: [8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46, 144],
    // 数字键值数组.
    NUMBER_KEY: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]
};

var KEYCODE_MAPPING = {
    "BACKSPACE": 8,
    "DELETE": 46,
    "TAB": 9,
    "ENTER": 13,
    "ESC": 27,
    "LEFTARROW": 37,
    "UPARROW": 38,
    "RIGHTARROW": 39,
    "DOWNARROW": 40,
    "INSERT": 45,
    "F5": 116,
    "F7": 118,
    "V": 86,
    "SPACE": 32
};

function SDateTimeMask(textId, formatString) {
    if (!textId) {
        return;
    }

    this.$ele = $(textId);
    this.$ele.css("ime-mode", "disabled");

    this.maskString = formatString || "yyyy-MM-dd";

    this.initMask(this.maskString);
    this.initEvent();
    this.initValue(this.$ele.val());
}

SDateTimeMask.prototype.initMask = function (formatString) {
    // 给元素本身附件mask、maskString、yearIndex、monthIndex、dayIndex、hourIndex、minuteIndex、secondIndex属性
    this.$ele.attr("mask", formatString);
    this.$ele.attr("maskString", formatString);
    this.$ele.attr("yearIndex", formatString.search("yyyy"));
    this.$ele.attr("monthIndex", formatString.search("MM"));
    this.$ele.attr("dayIndex", formatString.search("dd"));
    this.$ele.attr("hourIndex", formatString.search("hh"));
    this.$ele.attr("minuteIndex", formatString.search("mm"));
    this.$ele.attr("secondIndex", formatString.search("ss"));
};

SDateTimeMask.prototype.initEvent = function () {
    this.$ele.bind("textInput", $.proxy(this._onTextInput, this));
    this.$ele.bind("keydown", $.proxy(this._onKeyDown, this));
    this.$ele.bind("focus", $.proxy(this._onFocus, this));
    this.$ele.bind("blur", $.proxy(this._onBlur, this));
};

SDateTimeMask.prototype.initValue = function (aValue) {
    if (!aValue) {
        this.$ele.val("");
    } else {
        this.$ele.val(this.formatDateTime(aValue));
    }
};

SDateTimeMask.prototype._onTextInput = function (jEvent) {
    var keyCode = jEvent.which,
        text = this.$ele.val(),
        pos = this.getCurrentPosition();

    // 关于录入中文的问题：
    // 1. IE: 可通过CSS样式“ime-mode:disabled;”屏蔽中文输入法；
    // 2. Chrome: 录入全角字符时，onkeydown、onkeyup都相应，且keyCode为229；textInput事件也相应，且keyCode为0；
    // 3. Safari: 录入全角字符时，onkeydown、onkeyup都相应，且keyCode为229；textInput事件也相应，且keyCode为0；
    // 4. QT:录入全角字符时，onkeydown、onkeyup都不响应；textInput事件响应，且keyCode为0；
    if (keyCode == 0) {
        setTimeout($.proxy(function () {
            this.$ele.val(text);
            this.moveCursor(pos);
        }, this), 0);
    }
};

SDateTimeMask.prototype.formatDateTime = function (dateTimeString) {
    var $target = $(this.$ele);

    // 输入日期字符串与当前格式不吻合,矫正.
    if (dateTimeString == null || dateTimeString.length == 0
        || dateTimeString.length != this.maskString.length) {
        dateTimeString = this.getZero(this.maskString.length);
    }

    var yearIndex = Number($target.attr("yearIndex"));
    var monthIndex = Number($target.attr("monthIndex"));
    var dayIndex = Number($target.attr("dayIndex"));
    var hourIndex = Number($target.attr("hourIndex"));
    var minuteIndex = Number($target.attr("minuteIndex"));
    var secondIndex = Number($target.attr("secondIndex"));

    var result = this.maskString;
    var yearString = "";
    var monthString = "";
    var dayString = "";
    var hourString = "";
    var minuteString = "";
    var secondString = "";

    if (yearIndex >= 0) {
        var year = new Number(dateTimeString.substr(yearIndex, 4));
        if (isNaN(year) || year < SDateTimeMaskConfig.defaultLeastYear) {
            yearString = SDateTimeMaskConfig.defaultLeastYear.toString();
        } else if (year > SDateTimeMaskConfig.defaultMaxYear) {
            yearString = SDateTimeMaskConfig.defaultMaxYear.toString();
        } else {
            yearString = year.toString();
        }

        if (yearString.length < 4) {
            yearString = this.getZero(4 - yearString.length) + yearString;
        }
        result = this.replaceString(result, "yyyy", yearString);
    }

    if (monthIndex >= 0) {
        var month = new Number(dateTimeString.substr(monthIndex, 2));

        if (isNaN(month) || month > 19 || month <= 0) { // 原来是day>12, 但当 "03"->"12" 修改时，中间结果"13"会引发校验失败，结果变为02
            if (yearString != "0000") {
                monthString = "01";
            } else {
                monthString = "00";
            }
        } else {
            monthString = month.toString();
        }
        if (monthString.length < 2) {
            monthString = this.getZero(2 - monthString.length) + monthString;
        }
        result = this.replaceString(result, "MM", monthString);
    }
    if (dayIndex >= 0) {
        var day = new Number(dateTimeString.substr(dayIndex, 2));

        if (isNaN(day) || day > 39 || day <= 0) { // 原来是day>31, 但当 "16"->"31" 修改时，中间结果"35"会引发校验失败，结果变为31
            if (yearString != "0000" && monthString != "00") {
                dayString = "01";
            } else {
                dayString = "00";
            }
        } else {
            dayString = day.toString();
        }
        if (dayString.length < 2) {
            dayString = this.getZero(2 - dayString.length) + dayString;
        }
        result = this.replaceString(result, "dd", dayString);
    }
    if (hourIndex >= 0) {
        var hour = new Number(dateTimeString.substr(hourIndex, 2));

        if (isNaN(hour) || hour > 23 || hour <= 0) {
            hourString = "00";
        } else {
            hourString = hour.toString();
        }
        if (hourString.length < 2) {
            hourString = this.getZero(2 - hourString.length) + hourString;
        }
        result = this.replaceString(result, "hh", hourString);
    }
    if (minuteIndex >= 0) {
        var minute = new Number(dateTimeString.substr(minuteIndex, 2));

        if (isNaN(minute) || minute > 59 || minute <= 0) {
            minuteString = "00";
        } else {
            minuteString = minute.toString();
        }
        if (minuteString.length < 2) {
            minuteString = this.getZero(2 - minuteString.length) + minuteString;
        }
        result = this.replaceString(result, "mm", minuteString);
    }
    if (secondIndex >= 0) {
        var second = new Number(dateTimeString.substr(secondIndex, 2));

        if (isNaN(second) || second > 59 || second <= 0) {
            secondString = "00";
        } else {
            secondString = second.toString();
        }
        if (secondString.length < 2) {
            secondString = this.getZero(2 - secondString.length) + secondString;
        }
        result = this.replaceString(result, "ss", secondString);
    }
    return result;
};

SDateTimeMask.prototype._onKeyDown = function (jEvent) {
    var keyCode = jEvent.which,
        hasSelArea = false,
        ret = {},
        text = this.$ele.val(),
        pos = this.getCurrentPosition(),
        spos = 0,
        epos = 0,
        inputNumber = 0,
        selectInfo = null,
        decollatorChar = this.getDecollator(keyCode);


    hasSelArea = this.hasSelectionArea();

    if (hasSelArea) {
        selectInfo = this.getSelectionArea();

        if (!selectInfo) {
            return;
        }

        spos = selectInfo.selectStartPos;
        epos = selectInfo.selectEndPos;

        if (keyCode == KEYCODE_MAPPING.DELETE) {
            // delete
            ret = this.inputDeleteInArea(text, spos, epos);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (keyCode == KEYCODE_MAPPING.BACKSPACE) {
            // backspace
            ret = this.inputDeleteInArea(text, spos, epos);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (this.isNumber(keyCode)) {
            // 数字0-9
            inputNumber = keyCode - 96;
            if (inputNumber < 0) {
                inputNumber = keyCode - 48;
            }

            ret = this.inputNumberInArea(text, spos, epos, inputNumber);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (decollatorChar) {
            ret = this.inputDecollatorInArea(text, spos, epos, decollatorChar);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (keyCode == KEYCODE_MAPPING.LEFTARROW) {
            this.moveCursor(spos);
            jEvent.preventDefault();
        } else if (keyCode == KEYCODE_MAPPING.RIGHTARROW) {
            this.moveCursor(epos);
            jEvent.preventDefault();
        } else if (this.isKeyValid(keyCode)) {
            // 其他键盘功能键 不处理
        } else {
            // 其他键
            jEvent.preventDefault();
        }
    } else {
        if (keyCode == KEYCODE_MAPPING.DELETE) {
            // delete
            ret = this.inputDeleteInPosition(text, pos);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (keyCode == KEYCODE_MAPPING.BACKSPACE) {
            // backspace
            ret = this.inputBackSpaceInPosition(text, pos);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (this.isNumber(keyCode)) {
            // 数字0-9
            inputNumber = keyCode - 96;
            if (inputNumber < 0) {
                inputNumber = keyCode - 48;
            }

            ret = this.inputNumberInPosition(text, pos, inputNumber);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (keyCode == KEYCODE_MAPPING.LEFTARROW) {
            this.moveCursor(pos - 1);
            jEvent.preventDefault();
        } else if (keyCode == KEYCODE_MAPPING.RIGHTARROW) {
            this.moveCursor(pos + 1);
            jEvent.preventDefault();
        } else if (decollatorChar) {
            ret = this.inputDecollatorInPosition(text, pos, decollatorChar);

            if (ret && ret.text) {
                this.$ele.val(ret.text);
                this.moveCursor(ret.pos);
            }

            jEvent.preventDefault();
        } else if (this.isKeyValid(keyCode)) {
            // 其他键盘功能键 不处理
        } else {
            // 其他键
            jEvent.preventDefault();
        }
    }
};

SDateTimeMask.prototype._onFocus = function () {
    var aValue = this.$ele.val();

    if (!aValue) {
        this.$ele.val(this.formatDateTime(""));
    }

    this.moveCursor(0);
};

SDateTimeMask.prototype._onBlur = function () {
    var aValue = this.$ele.val();
    return this.isValidDateTime(aValue);
};

/**
 * 获得指定长度的零串
 * @param zeroLength
 * @return
 */
SDateTimeMask.prototype.getZero = function (zeroLength) {
    if (zeroLength == null || zeroLength == 0) {
        return "";
    }
    var temp = "";
    for (var i = 0; i < zeroLength; i++) {
        temp += "0";
    }
    return temp;
};

//替换目标字符串中的特定字符串.
// 参数：objString 目标字符串；sourceString 要替换的字符串；reString 替换后的字符串.
// 返回：替换完成后的字符串.
SDateTimeMask.prototype.replaceString = function (objString, sourceString, reString) {
    if (objString == null || objString.length == 0
        || sourceString == null || sourceString.length == 0
        || objString.search(sourceString) < 0) {
        return objString;
    }
    var frontStr = objString.substr(0, objString.search(sourceString));
    var lastStr = objString.substr(objString.search(sourceString) + sourceString.length);

    return (frontStr || "") + (reString || "") + (lastStr || "");
};

/**
 * 校验当前的值是不是一个合法的时间，如果不是 提醒 + 焦点调回 + 选中非法区域
 */
SDateTimeMask.prototype.isValidDateTime = function (eleValue) {
    var $target = this.$ele,
        self = this;

    if (eleValue.length > $target.attr("mask").length) {
        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
            this.$ele.val(this.formatDateTime(""));
            alert("当前录入值【" + eleValue + "】和 mask【" + $target.attr("mask") + "】不匹配，请检查！");
            this.$ele.focus();
        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
            this.$ele.val(this.formatDateTime(""));
            MsgBox.info("当前录入值【" + eleValue + "】和 mask【" + $target.attr("mask") + "】不匹配，请检查！", function () {
                self.$ele.focus();
            });
        }
        return false;
    }

    var yearIndex = Number($target.attr("yearIndex"));
    var monthIndex = Number($target.attr("monthIndex"));
    var dayIndex = Number($target.attr("dayIndex"));
    var hourIndex = Number($target.attr("hourIndex"));
    var minuteIndex = Number($target.attr("minuteIndex"));
    var secondIndex = Number($target.attr("secondIndex"));

    var year = 0,
        month = 0,
        day = 0,
        hour = 0,
        minute = 0,
        second = 0;

    if (yearIndex >= 0) {
        var year = new Number(eleValue.substr(yearIndex, 4));
    }
    if (monthIndex >= 0) {
        var month = new Number(eleValue.substr(monthIndex, 2));
    }
    if (dayIndex >= 0) {
        var day = new Number(eleValue.substr(dayIndex, 2));
    }

    if (hourIndex >= 0) {
        var hour = new Number(eleValue.substr(hourIndex, 2));
    }
    if (minuteIndex >= 0) {
        var minute = new Number(eleValue.substr(minuteIndex, 2));
    }
    if (secondIndex >= 0) {
        var second = new Number(eleValue.substr(secondIndex, 2));
    }

    if (year == 0 && month == 0 && day == 0 && hour == 0 && minute == 0 && second == 0) {
        this.$ele.val("");
        return true;
    }

    if (yearIndex >= 0 && (isNaN(year) || year == 0 || year < SDateTimeMaskConfig.defaultLeastYear || year > SDateTimeMaskConfig.defaultMaxYear)) {
        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
            alert("当前录入值【" + eleValue + "】的年【" + eleValue.substr(yearIndex, 4) + "】不合法，请检查！");
            setTimeout(function () {
                self.$ele.focus();
            }, 20);
        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
            MsgBox.info("当前录入值【" + eleValue + "】的年【" + eleValue.substr(yearIndex, 4) + "】不合法，请检查！", function () {
                self.$ele.focus();
            });
        }
        //this.selectArea( yearIndex, yearIndex + 4 );
        return false;
    }

    if (monthIndex >= 0 && (isNaN(month) || month <= 0 || month > 12)) {
        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
            alert("当前录入值【" + eleValue + "】的月【" + eleValue.substr(monthIndex, 2) + "】不合法，请检查！");
            setTimeout(function () {
                self.$ele.focus();
            }, 20);
        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
            MsgBox.info("当前录入值【" + eleValue + "】的月【" + eleValue.substr(monthIndex, 2) + "】不合法，请检查！", function () {
                self.$ele.focus();
            });
        }
        //this.selectArea( monthIndex, monthIndex + 2 );
        return false;
    }

    if (dayIndex >= 0 && (isNaN(day) || day <= 0 || day > 31)) {
        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
            alert("当前录入值【" + eleValue + "】的日【" + eleValue.substr(dayIndex, 2) + "】不合法，请检查！");
            setTimeout(function () {
                self.$ele.focus();
            }, 20);
        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
            MsgBox.info("当前录入值【" + eleValue + "】的日【" + eleValue.substr(dayIndex, 2) + "】不合法，请检查！", function () {
                self.$ele.focus();
            });
        }
        //this.selectArea( dayIndex, dayIndex + 2 );
        return false;
    }

    if (hourIndex >= 0 && (isNaN(hour) || hour < 0 || hour > 23)) {
        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
            alert("当前录入值【" + eleValue + "】的时【" + eleValue.substr(hourIndex, 2) + "】不合法，请检查！");
            setTimeout(function () {
                self.$ele.focus();
            }, 20);
        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
            MsgBox.info("当前录入值【" + eleValue + "】的时【" + eleValue.substr(hourIndex, 2) + "】不合法，请检查！", function () {
                self.$ele.focus();
            });
        }
        //this.selectArea( hourIndex, hourIndex + 2 );
        return false;
    }

    if (minuteIndex >= 0 && (isNaN(minute) || minute < 0 || minute > 59)) {
        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
            alert("当前录入值【" + eleValue + "】的分【" + eleValue.substr(minuteIndex, 2) + "】不合法，请检查！");
            setTimeout(function () {
                self.$ele.focus();
            }, 20);
        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
            MsgBox.info("当前录入值【" + eleValue + "】的时【" + eleValue.substr(hourIndex, 2) + "】不合法，请检查！", function () {
                self.$ele.focus();
            });
        }
        //this.selectArea( minuteIndex, minuteIndex + 2 );
        return false;
    }

    if (secondIndex >= 0 && (isNaN(second) || second < 0 || second > 59)) {
        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
            alert("当前录入值【" + eleValue + "】的秒【" + eleValue.substr(secondIndex, 2) + "】不合法，请检查！");
            setTimeout(function () {
                self.$ele.focus();
            }, 20);
        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
            MsgBox.info("当前录入值【" + eleValue + "】的时【" + eleValue.substr(hourIndex, 2) + "】不合法，请检查！", function () {
                self.$ele.focus();
            });
        }
        //this.selectArea( secondIndex, secondIndex + 2 );
        return false;
    }

    //增加对每月日期合法性的判断   2005-03-21		
    if (day > 28 && day < 31) {
        if (month == 2) {
            if (day != 29) {
                if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
                    alert(year + "年" + month + "月无" + day + "日，请检查！");
                    setTimeout(function () {
                        self.$ele.focus();
                    }, 20);
                } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
                    MsgBox.info(year + "年" + month + "月无" + day + "日，请检查！", function () {
                        self.$ele.focus();
                    });
                }
                //this.selectArea( dayIndex, dayIndex + 2 );
                return false;
            } else {
                if ((year % 4) != 0) {
                    if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
                        alert(year + "年" + month + "月无" + day + "日，请检查！");
                        setTimeout(function () {
                            self.$ele.focus();
                        }, 20);
                    } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
                        MsgBox.info(year + "年" + month + "月无" + day + "日，请检查！", function () {
                            self.$ele.focus();
                        });
                    }
                    //this.selectArea( dayIndex, dayIndex + 2 );
                    return false;
                } else {
                    if ((year % 100 == 0) && (year % 400 != 0)) {
                        if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
                            alert(year + "年" + month + "月无" + day + "日，请检查！");
                            setTimeout(function () {
                                self.$ele.focus();
                            }, 20);
                        } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
                            MsgBox.info(year + "年" + month + "月无" + day + "日，请检查！", function () {
                                self.$ele.focus();
                            });
                        }
                        //this.selectArea( dayIndex, dayIndex + 2 );
                        return false;
                    }
                }
            }
        }
    } else if (day == 31) {
        if ((month == 2) || (month == 4) || (month == 6) || (month == 9) || (month == 11)) {
            if (ThemeNames.getThemeType() == ThemeConstants.THEME_DEFAULT) {
                alert(month + "月无" + day + "日，请检查！");
                setTimeout(function () {
                    self.$ele.focus();
                }, 20);
            } else if (ThemeNames.getThemeType() == ThemeConstants.THEME_EXT) {
                MsgBox.info(month + "月无" + day + "日，请检查！", function () {
                    self.$ele.focus();
                });
            }
            //this.selectArea( dayIndex, dayIndex + 2 );
            return false;
        }
    }
    return true;
};

/**
 * 方法作用： 判断是否有选中区域
 * 返回值： true/false
 */
SDateTimeMask.prototype.hasSelectionArea = function () {
    var selText = null;

    if (window.getSelection) {
        var $targer = this.$ele,
            actEle = document.activeElement,
            orignText = $targer.val(),
            selStart = actEle.selectionStart,
            selEnd = actEle.selectionEnd;

        selText = orignText.substring(selStart, selEnd);
    } else {
        // IE6、7、8
        var selection = document.selection,
            selRange = selection.createRange();

        selText = selRange.text;
    }

    if (selText) {
        return true;
    }

    return false;
};

/**
 * 方法作用：获取选中区域信息
 * 返回值：ret
 */
SDateTimeMask.prototype.getSelectionArea = function () {
    var selText = null,
        _selText = null, //ie下求起始坐标用
        selStart = 0,
        selEnd = 0,
        ret = {},
        orignText = this.$ele.val();

    if (window.getSelection) {
        var actEle = document.activeElement;

        selStart = actEle.selectionStart,
            selEnd = actEle.selectionEnd;
        selText = orignText.substring(selStart, selEnd);
    } else {
        // IE6、7、8
        var selection = document.selection;
        var selRange = selection.createRange();

        selText = selRange.text;

        selRange.moveStart("character", -(this.$ele.val().length));
        _selText = selRange.text;
        selStart = _selText.length - selText.length;
        selEnd = selStart + selText.length;

        selRange.select(selStart, selEnd);
    }

    if (selText) {
        ret.selectionText = selText;
        ret.selectStartPos = selStart;
        ret.selectEndPos = selEnd;
    }

    return ret;
};

/**
 * 方法作用：非选中状态下录入数字
 */
SDateTimeMask.prototype.inputNumberInPosition = function (text, pos, char) {
    var ret = {};

    if (text.length == pos) {
        return;
    }

    var nextChar = text.substr(pos, 1);

    if ($.inArray(nextChar, SDateTimeMaskConfig.numberChar) != -1) {
        text = text.substr(0, pos) + char + text.substr(pos + 1);

        // yyyy-MM-dd hh:mm:ss
        // 0000-00-00 00:00:00
        //  年        月     日     时     分    秒
        // 这里要实现当【月】或【日】中存在全【0】项时，只要一修改【年】中的数值，
        // 立刻将【月】、【日】中的全【0】项初始化为【01】
        text = this.formatDateTime(text);

        ret.text = text;
        ret.pos = pos + 1;

        return ret;
    } else {
        return this.inputNumberInPosition(text, pos + 1, char);
    }
};

/**
 * 方法作用：选中状态下录入数字
 */
SDateTimeMask.prototype.inputNumberInArea = function (text, spos, epos, char) {
    var cpos = null,
        ret = {},
        p_ret = null,
        t_ret = null,
        i = 0;

    p_ret = this.inputNumberInPosition(text, spos, char);
    cpos = p_ret.pos;
    text = p_ret.text;

    t_ret = this.inputDeleteInArea(text, cpos, epos);
    text = t_ret.text;

    ret.pos = cpos;
    ret.text = text;

    return ret;
};

/**
 * 方法作用：非选中状态下录入分隔符
 */
SDateTimeMask.prototype.inputDecollatorInPosition = function (text, pos, char) {
    var ret = {};

    if (text.length == pos) {
        return;
    }

    var nextChar = text.substr(pos, 1);

    if (nextChar == char) {
        ret.text = text;
        ret.pos = pos + 1;
    } else {
        ret.pos = pos;
    }

    return ret;
};

SDateTimeMask.prototype.inputDecollatorInArea = function (text, spos, epos, char) {
    var ret = {},
        p_ret = null,
        pos = null;

    p_ret = this.inputDecollatorInPosition(text, spos, char);
    pos = p_ret.pos;

    t_ret = this.inputDeleteInArea(text, spos + 1, epos);
    text = t_ret.text;

    ret.text = text;
    ret.pos = pos;

    return ret;
};

SDateTimeMask.prototype.inputDeleteInPosition = function (text, pos) {
    var ret = {};

    if (text.length == pos) {
        return;
    }

    var nextChar = text.substr(pos, 1);

    if ($.inArray(nextChar, SDateTimeMaskConfig.numberChar) != -1) {
        text = text.substr(0, pos) + "0" + text.substr(pos + 1);
        pos = pos + 1;
    } else {
        pos = pos + 1;
    }

    ret.text = text;
    ret.pos = pos;

    return ret;
};

SDateTimeMask.prototype.inputDeleteInArea = function (text, spos, epos) {
    var ret = {},
        p_ret = null,
        t_ret = null,
        pos = null,
        i = 0;

    p_ret = this.inputDeleteInPosition(text, spos);
    pos = p_ret.pos - 1;
    text = p_ret.text;

    for (i = spos + 1; i < epos; i++) {
        t_ret = this.inputDeleteInPosition(text, i);
        text = t_ret.text;
    }

    ret.text = text;
    ret.pos = pos;

    return ret;
};

SDateTimeMask.prototype.inputBackSpaceInPosition = function (text, pos) {
    var ret = {};

    if (pos == 0) {
        return;
    }

    var prevChar = text.substr(pos - 1, 1);

    if ($.inArray(prevChar, SDateTimeMaskConfig.numberChar) != -1) {
        text = text.substr(0, pos - 1) + "0" + text.substr(pos);
        pos = pos - 1;
    } else {
        pos = pos - 1;
    }

    ret.text = text;
    ret.pos = pos;

    return ret;
};

/**
 * 方法作用：获取当前光标位置
 */
SDateTimeMask.prototype.getCurrentPosition = function () {
    var CaretPos = 0;   // IE Support
    var ele = this.$ele[0];
    if (document.selection) {
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ele.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ele.selectionStart || ele.selectionStart == '0')
        CaretPos = ele.selectionStart;
    return (CaretPos);
};

/**
 * 方法作用：移动光标到指定位置
 */
SDateTimeMask.prototype.moveCursor = function (pos) {
    var ctrl = this.$ele[0];

    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

/**
 * 判断键入的是不是数字.
 */
SDateTimeMask.prototype.isNumber = function (pressKeyCode) {
    if (pressKeyCode == null || typeof(pressKeyCode) != "number") {
        return false;
    }
    if (SDateTimeMaskConfig.NUMBER_KEY == null || SDateTimeMaskConfig.NUMBER_KEY.length == 0) {
        return false;
    }

    var dtmcnkLen = SDateTimeMaskConfig.NUMBER_KEY.length;
    for (var i = 0; i < dtmcnkLen; i++) {
        if (SDateTimeMaskConfig.NUMBER_KEY[i] == pressKeyCode) {
            return true;
        }
    }
    return false;
};

/**
 * 判断键入的是不是功能键.
 */
SDateTimeMask.prototype.isKeyValid = function (pressKeyCode) {
    if (pressKeyCode == null || typeof(pressKeyCode) != "number") {
        return false;
    }

    var dtmcwkLen = SDateTimeMaskConfig.WORK_KEY.length;
    for (var i = 0; i < dtmcwkLen; i++) {
        if (SDateTimeMaskConfig.WORK_KEY[i] == pressKeyCode) {
            return true;
        }
    }
    return false;
};

/**
 * 判断键入的是不是分隔符
 */
SDateTimeMask.prototype.getDecollator = function (pressKeyCode) {
    if (pressKeyCode == "109" || pressKeyCode == "189") {
        return "-";
    }

    if (pressKeyCode == "191" || pressKeyCode == "111") {
        return "/";
    }

    if (pressKeyCode == "186") {
        return ":";
    }

    if (pressKeyCode == "32") {
        return " ";
    }

    return null;
}

SDateTimeMask.prototype.selectArea = function (spos, epos) {
    var value = this.$ele.val();

    if (spos < 0 || epos > value.length) {
        alert("想选中的目标区域【" + spos + "~" + epos + "】超出范围，请检查！");
        return;
    }

    if (window.getSelection) {
        var actEle = this.$ele[0];
        actEle.selectionStart = spos;
        actEle.selectionEnd = epos;
    } else {
        // IE6、7、8
        var actEle = this.$ele[0],
            selRange = actEle.createTextRange();
        selRange.moveStart("character", spos);
        selRange.moveStart("character", epos);
        selRange.select();
    }
};