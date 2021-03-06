import React from "react";
import {
  render,
  fireEvent,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
// import { act } from "react-dom/test-utils";

import College from "./College";
import { ProfileContext } from "../../store/profile/contexts";

//https://github.com/testing-library/react-testing-library/issues/322
export const selectMaterialUiSelectOption = async (
  element,
  optionText
): Promise<HTMLInputElement> =>
  new Promise((resolve) => {
    // The the button that opens the dropdown, which is a sibling of the input
    const selectButton = element.parentNode.querySelector("[role=button]");

    // Open the select dropdown
    UserEvent.click(selectButton);

    // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
    const listbox = document.body.querySelector("ul[role=listbox]");

    // Click the list item
    const listItem = within(listbox).getByText(optionText);
    UserEvent.click(listItem);

    // Wait for the listbox to be removed, so it isn't visible in subsequent calls
    waitForElementToBeRemoved(() =>
      document.body.querySelector("ul[role=listbox]")
    ).then(resolve);
  });

describe("<College>", () => {
  const college = {
    name: "",
    faculty: "",
    department: "",
    result: [],
  };

  const validation = {
    message: {
      college: {
        faculty: "",
      },
    },
  };

  const handleChangeCollege = jest.fn();
  const handleSearchCollege = jest.fn();
  const handleResetCollege = jest.fn();
  const theme = {
    handleChangeCollege: handleChangeCollege,
    handleSearchCollege: handleSearchCollege,
    handleResetCollege: handleResetCollege,
    college: college,
    validation: validation,
  };

  it("イベントハンドラが指定通り回呼ばれるか", () => {
    const { getByTestId } = render(
      <ProfileContext.Provider value={theme}>
        <College />
      </ProfileContext.Provider>
    );

    fireEvent.change(getByTestId("search"), { target: { value: "北海道" } });
    fireEvent.click(getByTestId("searchBtn"));
    expect(handleSearchCollege).toHaveBeenCalledTimes(1);
  });

  it("イベントハンドラが指定回数通り呼ばれるか", async () => {
    theme.college.name = "北海道大学";
    theme.college.faculty = "普通学部";
    theme.college.result = [
      {
        name: "北海道大学",
        faculty: [{ name: "普通学部", department: ["普通学科"] }],
        department: ["普通学科"],
      },
    ];
    const { getByTestId, queryByText } = render(
      <ProfileContext.Provider value={theme}>
        <College />
      </ProfileContext.Provider>
    );

    //学科の選択
    const select0 = getByTestId("faculty");
    expect(select0).toBeTruthy();
    await selectMaterialUiSelectOption(select0, "普通学部");
    expect(queryByText("普通学部")).not.toBeUndefined();

    const select1 = getByTestId("department");
    expect(select1).toBeTruthy();
    await selectMaterialUiSelectOption(select1, "普通学科");
    expect(queryByText("普通学科")).not.toBeUndefined();

    const resetBtn = getByTestId("resetBtn");
    expect(resetBtn).toBeTruthy();
    fireEvent.click(resetBtn);
    expect(handleResetCollege).toHaveBeenCalledTimes(1);
  });

  it("validationのアラート文が表示されるか", async () => {
    theme.validation.message.college.faculty = "学部を選択してください。";
    theme.validation.message.college.department = "学科を選択してください。";

    theme.college.name = "北海道大学";
    theme.college.faculty = "普通学部";
    theme.college.result = [
      {
        name: "北海道大学",
        faculty: [{ name: "普通学部", department: ["普通学科"] }],
        department: ["普通学科"],
      },
    ];
    const { getByTestId, queryByText } = render(
      <ProfileContext.Provider value={theme}>
        <College />
      </ProfileContext.Provider>
    );

    expect(queryByText("学部を選択してください。")).not.toBeUndefined();

    //学科の選択
    const select0 = getByTestId("faculty");
    await selectMaterialUiSelectOption(select0, "普通学部");
    expect(queryByText("普通学部")).not.toBeUndefined();

    expect(queryByText("学科を選択してください。")).not.toBeUndefined();
  });
});
