class methods{
	private void callPrivate(String call) {
		System.out.println(call);
	}
	public void callPublic(String call) {
		System.out.println(call);
	}
	private static void callStaticPrivate(String call) {
		System.out.println(call);
	}
	public static void callStaticPublic(String call) {
		System.out.println(call);
	}
}