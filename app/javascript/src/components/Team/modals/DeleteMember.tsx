import React, { useRef } from "react";

import { useOutsideClick, useKeypress } from "helpers";
import { XIcon } from "miruIcons";
import { Toastr, Modal, Button } from "StyledComponents";

import teamApi from "apis/team";
import { TeamModalType } from "constants/index";
import { useList } from "context/TeamContext";

const DeleteMember = ({ user }) => {
  const wrapperRef = useRef();

  const { setModalState, modal } = useList();

  const deleteTeamMember = async () => {
    try {
      if (user.isTeamMember) {
        await teamApi.destroyTeamMember(user.id);
      } else {
        await teamApi.deleteInvitedMember(user.id);
      }
      setModalState(TeamModalType.NONE);
    } catch (error) {
      Toastr.error(error.message);
    }
  };

  useOutsideClick(wrapperRef, () => {
    setModalState(TeamModalType.NONE);
  });

  useKeypress("Escape", () => {
    setModalState(TeamModalType.NONE);
  });

  return (
    <Modal
      customStyle="sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      isOpen={modal == "delete"}
      onClose={() => {
        setModalState(TeamModalType.NONE);
      }}
    >
      <div className="flex items-center justify-between">
        <h6 className="text-2xl font-bold">
          {user.isTeamMember ? "Delete User" : "Delete Invite"}
        </h6>
        <Button
          type="button"
          onClick={() => {
            setModalState(TeamModalType.NONE);
          }}
        >
          <XIcon color="#CDD6DF" size={16} weight="bold" />
        </Button>
      </div>
      <p className="my-8">
        Are you sure you want to delete user <b> {user?.name}</b>? This action
        cannot be reversed.
      </p>
      <div className="flex justify-between">
        <Button
          className="mr-2 w-1/2"
          size="medium"
          style="secondary"
          onClick={() => setModalState(TeamModalType.NONE)}
        >
          CANCEL
        </Button>
        <Button
          className="ml-2 w-1/2"
          size="medium"
          style="primary"
          onClick={() => deleteTeamMember()}
        >
          DELETE
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteMember;
