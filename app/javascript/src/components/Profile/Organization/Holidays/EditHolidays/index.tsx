import React from "react";

import dayjs from "dayjs";
import { DeleteIcon, CalendarIcon } from "miruIcons";
import { Button } from "StyledComponents";

import CustomDatePicker from "common/CustomDatePicker";
import { CustomInputText } from "common/CustomInputText";
import CustomReactSelect from "common/CustomReactSelect";
import CustomToggle from "common/CustomToggle";
import { Divider } from "common/Divider";
import { repetitionType } from "constants/leaveType";

import { customStyles } from "./utils";

const EditHolidays = ({
  setShowDatePicker,
  holidayList,
  showDatePicker,
  handleDatePicker,
  handleHolidateNameChange,
  handleDeleteHoliday,
  handleCheckboxClick,
  enableOptionalHolidays,
  totalOptionalHolidays,
  handleChangeTotalOpHoliday,
  handleAddHoliday,
  optionalRepetitionType,
  optionalHolidaysList,
  optionalWrapperRef,
  handleChangeRepetitionOpHoliday,
  setShowOptionalDatePicker,
  showOptionalDatePicker,
  wrapperRef,
  setEnableOptionalHolidays,
  isDesktop,
  handleCancelAction,
  updateHolidayDetails,
}) => (
  <div className="mt-4 p-4 lg:min-h-80v lg:bg-miru-gray-100 lg:p-10">
    <div className="flex flex-col py-6 lg:flex-row">
      <div className="flex p-2 lg:w-2/12">
        <CalendarIcon className="mr-2 mt-1" size={20} weight="bold" />
        <div className="">Public Holidays</div>
      </div>
      <div className="p-2 lg:w-10/12">
        <div className="flex flex-col">
          {holidayList.length > 0 ? (
            holidayList.map((holiday, index) => (
              <div className="mb-4 flex flex-row" key={index}>
                <div className="flex w-11/12 flex-row py-2">
                  <div className="relative w-1/2" ref={wrapperRef}>
                    <div
                      onClick={() => {
                        setShowDatePicker({
                          visibility: !showDatePicker.visibility,
                          index,
                        });
                      }}
                    >
                      <CustomInputText
                        readOnly
                        id="Date"
                        inputBoxClassName="border focus:border-miru-han-purple-1000 cursor-pointer"
                        label="Date"
                        labelClassName="cursor-pointer"
                        name="Date"
                        type="text"
                        value={
                          holiday.date &&
                          dayjs(holiday.date).format("DD.MM.YYYY")
                        }
                      />
                      <CalendarIcon
                        className="absolute top-2 right-2 m-2"
                        color="#5B34EA"
                        size={20}
                      />
                    </div>
                    {index == showDatePicker.index &&
                      showDatePicker.visibility && (
                        <CustomDatePicker
                          date={holiday.date ? holiday.date : dayjs()}
                          handleChange={e => handleDatePicker(e, index, false)}
                          setVisibility={showDatePicker.visibility}
                          showYearDropdown={false}
                          wrapperRef={wrapperRef}
                        />
                      )}
                  </div>
                  <div className="w-1/2 pl-1">
                    <CustomInputText
                      id="Name"
                      inputBoxClassName="border focus:border-miru-han-purple-1000 cursor-pointer"
                      label="Name"
                      labelClassName="cursor-pointer"
                      name="Name"
                      type="text"
                      value={holiday.name}
                      onChange={e => handleHolidateNameChange(e, index, false)}
                    />
                  </div>
                </div>
                <div className="flex w-1/12 items-center justify-center">
                  <button onClick={() => handleDeleteHoliday(false, index)}>
                    <DeleteIcon
                      className="ml-2 cursor-pointer rounded-full"
                      color="#5b34ea"
                      style={{ minWidth: "40px" }}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div> No data found </div>
          )}
          <div
            className="dotted-btn w-11/12 px-4 py-2 text-center text-miru-dark-purple-200"
            onClick={() => handleAddHoliday(false)}
          >
            + Add Holiday
          </div>
        </div>
      </div>
    </div>
    <Divider />
    <div className="flex flex-col py-6 lg:flex-row">
      <div className="flex p-2 lg:w-2/12">
        <CalendarIcon className="mr-2 mt-1" size={20} weight="bold" />
        <div className="">Optional Holidays</div>
      </div>
      <div className="p-2 lg:w-10/12">
        <div className="flex flex-row justify-between lg:w-11/12">
          <span className="flex items-center text-xs font-normal text-miru-dark-purple-1000">
            Enable optional holidays
          </span>
          <CustomToggle
            id="optionalHolidays"
            isChecked={enableOptionalHolidays}
            setIsChecked={setEnableOptionalHolidays}
            toggleCss="mt-5"
            onToggle={handleCheckboxClick}
          />
        </div>
        {enableOptionalHolidays && (
          <div className="mt-4 flex flex-col">
            <div className="flex flex-row py-2 lg:w-11/12">
              <div className="w-1/2">
                <CustomInputText
                  id="total_op_holidays"
                  inputBoxClassName="border focus:border-miru-han-purple-1000 cursor-pointer"
                  label="Total optional holidays"
                  labelClassName="cursor-pointer"
                  min={0}
                  name="total_op_holidays"
                  type="number"
                  value={totalOptionalHolidays}
                  onChange={handleChangeTotalOpHoliday}
                />
              </div>
              <div className="w-1/2 px-2">
                <CustomReactSelect
                  handleOnChange={handleChangeRepetitionOpHoliday}
                  id="repetitionType"
                  label=""
                  name="repetitionType"
                  options={repetitionType}
                  styles={customStyles}
                  wrapperClassName="h-12"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  value={
                    optionalRepetitionType
                      ? repetitionType.filter(
                          option => option.value === optionalRepetitionType
                        )
                      : repetitionType[0]
                  }
                />
              </div>
            </div>
            <div className="mt-10">
              <label className="flex items-center text-xs font-normal text-miru-dark-purple-1000">
                List of optional holidays
              </label>
              {optionalHolidaysList.length > 0 ? (
                optionalHolidaysList.map((optionalHoliday, index) => (
                  <div className="flex flex-row" key={index}>
                    <div className="flex w-11/12 flex-row py-3">
                      <div className="relative w-1/2" ref={optionalWrapperRef}>
                        <div
                          onClick={() =>
                            setShowOptionalDatePicker({
                              visibility: !showOptionalDatePicker.visibility,
                              index,
                            })
                          }
                        >
                          <CustomInputText
                            readOnly
                            id="op_holiday_date_picker"
                            inputBoxClassName="border focus:border-miru-han-purple-1000 cursor-pointer"
                            label="Date"
                            labelClassName="cursor-pointer"
                            name="op_holiday_date_picker"
                            type="text"
                            value={
                              optionalHoliday.date &&
                              dayjs(optionalHoliday.date).format("DD.MM.YYYY")
                            }
                          />
                          <CalendarIcon
                            className="absolute top-2 right-2 m-2"
                            color="#5B34EA"
                            size={20}
                          />
                        </div>
                        {index == showOptionalDatePicker.index &&
                          showOptionalDatePicker.visibility && (
                            <CustomDatePicker
                              date={optionalHoliday.date || dayjs()}
                              setVisibility={showOptionalDatePicker.visibility}
                              showYearDropdown={false}
                              wrapperRef={optionalWrapperRef}
                              handleChange={e =>
                                handleDatePicker(e, index, true)
                              }
                            />
                          )}
                      </div>
                      <div className="w-1/2 pl-1">
                        <CustomInputText
                          id="holiday_name_op"
                          inputBoxClassName="border focus:border-miru-han-purple-1000 cursor-pointer"
                          label="Name"
                          labelClassName="cursor-pointer"
                          min={0}
                          name="holiday_name_op"
                          type="text"
                          value={optionalHoliday.name}
                          onChange={e =>
                            handleHolidateNameChange(e, index, true)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex w-1/12 items-center justify-center">
                      <button onClick={() => handleDeleteHoliday(true, index)}>
                        <DeleteIcon
                          className="ml-2 cursor-pointer rounded-full"
                          color="#5b34ea"
                          style={{ minWidth: "40px" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div> No data found</div>
              )}
            </div>
            <div
              className="dotted-btn mt-4 px-4 py-2 text-center text-miru-dark-purple-200 lg:w-11/12"
              onClick={() => handleAddHoliday(true)}
            >
              + Add Optional Holiday
            </div>
          </div>
        )}
      </div>
    </div>
    {!isDesktop && holidayList.length > 0 && (
      <div className="mt-5 flex w-full justify-between px-2">
        <Button
          className="mr-2 flex w-1/2 items-center justify-center rounded border border-miru-red-400 px-4 py-2"
          onClick={handleCancelAction}
        >
          <span className="ml-2 text-center text-base font-bold leading-5 text-miru-red-400">
            Cancel
          </span>
        </Button>
        <Button
          className="ml-2 flex w-1/2 items-center justify-center px-4 py-2"
          style="primary"
          onClick={updateHolidayDetails}
        >
          <span className="ml-2 text-center text-base font-bold leading-5 text-white">
            Save
          </span>
        </Button>
      </div>
    )}
  </div>
);

export default EditHolidays;