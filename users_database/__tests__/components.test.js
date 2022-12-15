import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "../components/form";
import { addUserEP, editSubmitEP } from '../services/endpoint';
import SingleUser from "../components/singleUser";
import Layout from '../components/layout';

jest.mock('../services/endpoint');

describe("Components", () => {
  describe('Add Form', () => {
    beforeEach(() => {
      addUserEP?.mockReturnValue(Promise.resolve({
        status: 201,
        data: {
          id: '1',
          createdAt: '2022-20-10',
          firstName: 'Abigail',
          lastName: 'Folarin',
          
        },
      }));
     
    });
    it("should render add user form component", async () => {
      const props = {
        closeModal: jest.fn(),
        setShowModal: jest.fn(),
        refetch: jest.fn(),
        id: "2",
        setUserDetails: jest.fn(),
      };
      render(<Form {...props} />);

      await waitFor(() => {
        fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'Abigail' } });
        fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Idowu' } });
        fireEvent.submit(screen.getByTestId('form'));
      });
      fireEvent.click(screen.getByTestId('cancel-button'))
    });
  })

  describe('Edit Form', () => {
    beforeEach(() => {
      editSubmitEP?.mockReturnValue(Promise.resolve({
        status: 200,
        data: {
          id: '1',
          createdAt: '2022-20-10',
          firstName: 'Abigail',
          lastName: 'Folarin',
          
        },
      }));
    })
    it('hould render edit user form component', async () => {
      const props = {
        userid : 7,
        closeModal: jest.fn(),
        setShowModal: jest.fn(),
        setUserDetails: jest.fn(),
        refetch: jest.fn(),
        reset: jest.fn(),
      };
      render(<Form {...props} />);
      await waitFor(() => {
        fireEvent.change(screen.getByTestId('first-name'), { target: { value: 'Abigail' } });
        fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Idowu' } });
        fireEvent.submit(screen.getByTestId('form'));
      });
      fireEvent.click(screen.getByTestId('cancel-button'))
      // expect(editSubmitEP).toHaveBeenCalledTimes(1);
    })
  })

  it('should render single user component', () => {
    const props = {
      toggleClass: false,
      handleSelectUser: jest.fn(),
      setToggleClass: jest.fn(),
      firstName: 'Abigail',
      key: "3",
      lastName: "Idowu",
      createdAt: "22:00:00",
      userId: "3",
    }
    render(<SingleUser {...props} />)
    fireEvent.click(screen.getByTestId('user'))
    fireEvent.mouseDown(screen.getByTestId('user'))
  })

  it('should render component layout', () => {
    const props = {
      children: <div>hello</div>
    }
    render(<Layout {...props} />)
  })
});
