import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Camera, Edit3, Check } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PersonalInfoForm = ({
  form,
  onSubmit,
  previewUrl,
  handleButtonClick,
  handleFileChange,
  fileInputRef,
}) => {
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full relative"
        >
          <div className="m-0 p-0">
            <div className="sticky top-0 text-2xl z-2 s">
              Edit Personal Details
            </div>
          </div>
          <Separator />
          <div className="space-y-6">
            <div className="grid w-full grid-cols-1 my-3 items-center md:grid-cols-[1fr_auto] h-auto md:gap-6 xl:gap-8">
              <div className="order-2 md:order-1 flex flex-col justify-around items-center h-full">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="designation"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="order-1 mb-4 flex justify-center md:order-2 relative md:mb-0 md:pt-2">
                <Button
                  name="profilePic"
                  variant="ghost"
                  className="border flex flex-col w-30 h-30 p-2 rounded-full z-2"
                  onClick={handleButtonClick}
                  type="button"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <Camera size={150} className="p-10" />
                  )}
                  <Edit3
                    size={50}
                    className="rounded-full bg-muted border p-3 absolute bottom-0 align-middle flex right-0"
                  />
                  <Input
                    name="profilePic"
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <h4 className="text-foreground text-2xl leading-none h-8 sticky top-0 z-1 my-2 font-semibold">
                Links
              </h4>
              <Separator />
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem className="my-3">
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="LinkedIn"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem className="my-3">
                    <FormLabel>Github</FormLabel>
                    <FormControl>
                      <Input placeholder="Github" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem className="my-3">
                    <FormLabel>Other</FormLabel>
                    <FormControl>
                      <Input placeholder="Other" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="sticky items-center bg-background w-full border px-4 py-3 rounded-xl bottom-0 flex flex-row justify-end gap-5">
                <Button
                  type="submit"
                  className="text-lg flex flex-row justify-center rounded-full gap-2 h-12 font-medium"
                >
                  <Check />
                  <Separator orientation="vertical" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

PersonalInfoForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  previewUrl: PropTypes.string,
  handleButtonClick: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
};

export default PersonalInfoForm;
